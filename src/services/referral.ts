import {
  collection,
  doc,
  setDoc,
  getDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "./firebase";

export const ReferralService = {
  usersCollection: collection(db, "users"),
  walletsCollection: collection(db, "wallets"),

  async generateReferralCode(length = 10): Promise<string> {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:,.<>?";

    // Generate a random byte array
    const random = crypto.getRandomValues(new Uint8Array(16));

    // Convert the timestamp to a byte array
    const timestamp = Date.now().toString();
    const timestampBytes = new TextEncoder().encode(timestamp);

    // Combine the random bytes and timestamp bytes into a single array
    const combined = new Uint8Array(random.length + timestampBytes.length);
    combined.set(random);
    combined.set(timestampBytes, random.length);

    // Hash the combined array with SHA-256
    const hashBuffer = await crypto.subtle.digest("SHA-256", combined);
    const hashBytes = new Uint8Array(hashBuffer);

    // Generate the referral code by mapping the hash bytes to characters
    const referralCode = Array.from(hashBytes)
      .slice(0, length)
      .map((byte) => chars[byte % chars.length])
      .join("");

    return referralCode;
  },

  async registerUser(name: string): Promise<string> {
    const refCode = await this.generateReferralCode(10);
    const userData: UserData = {
      userId: refCode,
      referralCode: refCode,
      characterName: name,
      by: "",
      byParent: "",
    };

    console.log("refCode", refCode);
    await setDoc(doc(this.usersCollection, refCode), userData);
    return refCode;
  },

  async updateWalletInfo(
    userId: string,
    wallet: string,
    character: string
  ): Promise<void> {
    const userData: WalletData = {
      userId: userId,
      wallet: wallet,
      character: character,
    };

    await setDoc(doc(this.walletsCollection, wallet), userData, {
      merge: true,
    });
  },

  async addReferral(by: string, myRefCode = ""): Promise<string> {
    const byDoc = doc(this.usersCollection, by);
    const docSnapshot = await getDoc(byDoc);
    if (!docSnapshot.exists()) {
      return "";
    }

    const data = docSnapshot.data() as UserData;
    const byParent = data.by;
    const refCode = myRefCode || (await this.generateReferralCode(7));

    const refDoc = doc(this.usersCollection, refCode);
    const refSnapshot = await getDoc(refDoc);
    const refData: Partial<UserData> = {
      userId: refCode,
      referralCode: refCode,
      by: by,
      byParent: byParent,
    };

    if (refSnapshot.exists()) {
      await setDoc(refDoc, refData, { merge: true });
    } else {
      refData.characterName = "";
      await setDoc(refDoc, refData as UserData);
    }

    return refCode;
  },

  async getReferrals(user: string, maxDepth: number): Promise<ReferralNode> {
    const buildReferralTree = async (
      userId: string,
      depth: number
    ): Promise<ReferralNode> => {
      const userDoc = await getDoc(doc(this.usersCollection, userId));
      const userData = userDoc.data() as UserData;

      const node: ReferralNode = {
        id: userDoc.id,
        name: userData.characterName || "No Name",
        level: depth,
        userId: userData.userId,
        children: [],
      };

      if (depth < maxDepth) {
        const invitedUsersQuery = query(
          this.usersCollection,
          where("by", "==", userId)
        );
        const invitedUsersSnapshot = await getDocs(invitedUsersQuery);

        for (const doc of invitedUsersSnapshot.docs) {
          console.log("doc.data()", doc.data());
          const childNode = await buildReferralTree(doc.id, depth + 1);
          console.log("childNode", childNode);
          node.children.push(childNode);
        }
      }

      return node;
    };

    return buildReferralTree(user, 0);
  },
  async getPerLevelReferrals(
    referrals: Referral[]
  ): Promise<Record<number, number>> {
    const levelCounts: Record<number, number> = {};

    referrals.forEach((referral) => {
      const level = referral.level;
      levelCounts[level] = (levelCounts[level] || 0) + 1;
    });

    return levelCounts;
  },
  async calculateNftCommissions(
    user: string,
    nftPrice: number
  ): Promise<{
    totalCommission: number;
    commissionDistribution: Record<string, number>;
  }> {
    const commissionRates = [
      0.12, 0.06, 0.04, 0.02, 0.02, 0.01, 0.01, 0.005, 0.005, 0.005,
    ];
    const totalCommission = nftPrice * 0.22;

    const referrals = await this.getReferrals(user, 10);
    const commissionDistribution: Record<string, number> = {};

    const calculateCommission = (
      node: ReferralNode,
      rates: number[],
      distribution: Record<string, number>
    ) => {
      if (node.level > 0 && node.level <= rates.length) {
        const commission = nftPrice * rates[node.level - 1];
        distribution[node.id] = (distribution[node.id] || 0) + commission;
      }

      for (const child of node.children) {
        calculateCommission(child, rates, distribution);
      }
    };

    calculateCommission(referrals, commissionRates, commissionDistribution);

    return {
      totalCommission,
      commissionDistribution,
    };
  },

  async calculateLotteryCommissions(
    user: string,
    ticketPrice: number
  ): Promise<{
    totalCommission: number;
    commissionDistribution: Record<string, number>;
  }> {
    const commissionRates = [
      0.12, 0.06, 0.04, 0.02, 0.02, 0.01, 0.01, 0.005, 0.005, 0.005,
    ];
    const totalCommission = ticketPrice * 0.28;

    const referrals = await this.getReferrals(user, 10);
    const commissionDistribution: Record<string, number> = {};

    const calculateCommission = (
      node: ReferralNode,
      rates: number[],
      distribution: Record<string, number>
    ) => {
      if (node.level > 0 && node.level <= rates.length) {
        const commission = ticketPrice * rates[node.level - 1];
        distribution[node.id] = (distribution[node.id] || 0) + commission;
      }

      for (const child of node.children) {
        calculateCommission(child, rates, distribution);
      }
    };

    calculateCommission(referrals, commissionRates, commissionDistribution);

    return {
      totalCommission,
      commissionDistribution,
    };
  },
};
