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
import { updateDoc } from "firebase/firestore";

export const ReferralService = {
  usersCollection: collection(db, "users"),
  userCountCollection: collection(db, "userCount"),
  referralDataCollection: collection(db, "referralData"),

  async getTotalUsers(): Promise<number> {
    const countSnapshot = await getDoc(doc(this.userCountCollection, "count"));
    if (countSnapshot.exists()) {
      const data = countSnapshot.data() as { count: number };
      return data.count;
    } else {
      return 0;
    }
  },
  async generateReferralCode(length = 8): Promise<string> {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

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
    const code = Array.from(hashBytes)
      .slice(0, length)
      .map((byte) => chars[byte % chars.length])
      .join("");

    return code;
  },

  async checkExistence(wallet: string): Promise<boolean> {
    const existingSnapshot = await getDoc(doc(this.usersCollection, wallet));
    return existingSnapshot.exists();
  },
  async getUser(wallet: string): Promise<UserData | undefined> {
    const existingSnapshot = await getDoc(doc(this.usersCollection, wallet));
    if (existingSnapshot.exists()) {
      return existingSnapshot.data() as UserData;
    } else {
      return;
    }
  },
  async registerUser({
    wallet,
    name,
    by = "",
  }: {
    wallet: string;
    name: string;
    by: string;
  }): Promise<{
    exists: boolean;
    created: boolean;
    data: UserData;
  }> {
    console.log("wallet,name,by", wallet, name, by);
    const existingSnapshot = await getDoc(doc(this.usersCollection, wallet));

    if (existingSnapshot.exists()) {
      const data = existingSnapshot.data() as UserData;
      return {
        exists: true,
        created: false,
        data,
      };
    }
    // add Referral Data
    const code = await this.generateReferralCode();
    const referralData: ReferralData = {
      wallet,
      code,
      by,
    };

    await setDoc(doc(this.referralDataCollection, code), referralData);
    let byParent = "";
    if (by) {
      const byDoc = doc(this.referralDataCollection, by);
      const docSnapshot = await getDoc(byDoc);
      if (docSnapshot.exists()) {
        const data = docSnapshot.data() as ReferralData;
        console.log("by,data.by,data", by, data.by, data);
        byParent = data.by ?? "";
        console.log("byParent", byParent);
      }
    }

    const userData: UserData = {
      wallet,
      code,
      name,
      by,
      byParent,
    };
    await setDoc(doc(this.usersCollection, wallet), userData);
    const countSnapshot = await getDoc(doc(this.userCountCollection, "count"));
    if (countSnapshot.exists()) {
      const data = countSnapshot.data() as { count: number };
      updateDoc(doc(this.userCountCollection, "count"), {
        count: data.count + 1,
      });
    } else {
      await setDoc(doc(this.userCountCollection, "count"), { count: 1 });
    }
    return {
      exists: false,
      created: true,
      data: userData,
    };
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

    await setDoc(doc(this.referralDataCollection, wallet), userData, {
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
      code: refCode,
      by: by,
      byParent: byParent,
    };

    if (refSnapshot.exists()) {
      await setDoc(refDoc, refData, { merge: true });
    } else {
      refData.name = "";
      await setDoc(refDoc, refData as UserData);
    }

    return refCode;
  },

  async getReferrals(wallet: string): Promise<ReferralNode> {
    const buildReferralTree = async (
      userId: string,
      depth: number
    ): Promise<ReferralNode> => {
      const userDoc = await getDoc(doc(this.usersCollection, userId));
      const userData = userDoc.data() as UserData;

      const node: ReferralNode = {
        id: userDoc.id,
        name: userData.name || "No Name",
        level: depth,
        code: userData.code,
        children: [],
      };

      if (depth < 10) {
        const invitedUsersQuery = query(
          this.usersCollection,
          where("by", "==", userData.code)
        );
        const invitedUsersSnapshot = await getDocs(invitedUsersQuery);
        console.log("invitedUsersSnapshot", invitedUsersSnapshot.docs.length);
        for (const doc of invitedUsersSnapshot.docs) {
          console.log("doc.data()", doc.data());
          const childNode = await buildReferralTree(doc.id, depth + 1);
          console.log("childNode", childNode);
          node.children.push(childNode);
        }
      }

      return node;
    };

    return buildReferralTree(wallet, 0);
  },
  async getTopReferralCount(wallet: string): Promise<number> {
    const countReferrals = async (userId: string): Promise<number> => {
      const userDoc = await getDoc(doc(this.usersCollection, userId));
      const userData = userDoc.data() as UserData;
      const invitedUsersQuery = query(
        this.usersCollection,
        where("by", "==", userData.code)
      );
      const invitedUsersSnapshot = await getDocs(invitedUsersQuery);
      let count = invitedUsersSnapshot.docs.length;

      return count;
    };

    return countReferrals(wallet);
  },
  async getReferralCount(wallet: string): Promise<number> {
    const countReferrals = async (
      userId: string,
      depth: number
    ): Promise<number> => {
      const userDoc = await getDoc(doc(this.usersCollection, userId));
      const userData = userDoc.data() as UserData;

      let count = 0;

      if (depth < 10) {
        const invitedUsersQuery = query(
          this.usersCollection,
          where("by", "==", userData.code)
        );
        const invitedUsersSnapshot = await getDocs(invitedUsersQuery);
        count += invitedUsersSnapshot.docs.length;

        for (const doc of invitedUsersSnapshot.docs) {
          count += await countReferrals(doc.id, depth + 1);
        }
      }

      return count;
    };

    return countReferrals(wallet, 0);
  },

  async getReferralDataWithCount(
    wallet: string
  ): Promise<{ name: string; count: number }> {
    const userDoc = await getDoc(doc(this.usersCollection, wallet));
    const me = userDoc.data() as UserData;

    const countReferrals = async (
      userId: string,
      depth: number
    ): Promise<number> => {
      const userDoc = await getDoc(doc(this.usersCollection, userId));
      const userData = userDoc.data() as UserData;

      let count = 0;

      if (depth < 10) {
        const invitedUsersQuery = query(
          this.usersCollection,
          where("by", "==", userData.code)
        );
        const invitedUsersSnapshot = await getDocs(invitedUsersQuery);
        count += invitedUsersSnapshot.docs.length;

        for (const doc of invitedUsersSnapshot.docs) {
          count += await countReferrals(doc.id, depth + 1);
        }
      }

      return count;
    };
    let count = await countReferrals(wallet, 0);
    return { name: me.name, count };
  },
  async getAllReferralDataWithCount(): Promise<UserReferralMeta[]> {
    const allUsersSnapshot = await getDocs(this.usersCollection);
    const referralData: UserReferralMeta[] = [];

    const countReferrals = async (
      userId: string,
      depth: number
    ): Promise<number> => {
      const userDoc = await getDoc(doc(this.usersCollection, userId));
      const userData = userDoc.data() as UserData;

      let count = 0;

      if (depth < 10) {
        const invitedUsersQuery = query(
          this.usersCollection,
          where("by", "==", userData.code)
        );
        const invitedUsersSnapshot = await getDocs(invitedUsersQuery);
        count += invitedUsersSnapshot.docs.length;

        for (const doc of invitedUsersSnapshot.docs) {
          count += await countReferrals(doc.id, depth + 1);
        }
      }

      return count;
    };

    for (const doc of allUsersSnapshot.docs) {
      const userData = doc.data() as UserData;
      const count = await countReferrals(doc.id, 0);
      referralData.push({
        pubKey: userData.wallet,
        name: userData.name || "No Name",
        count,
      });
    }

    return referralData;
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
    wallet: string,
    nftPrice: number
  ): Promise<{
    totalCommission: number;
    commissionDistribution: Record<string, number>;
  }> {
    const commissionRates = [
      0.12, 0.06, 0.04, 0.02, 0.02, 0.01, 0.01, 0.005, 0.005, 0.005,
    ];
    const totalCommission = nftPrice * 0.22;

    const referrals = await this.getReferrals(wallet);
    const commissionDistribution: Record<string, number> = {};

    const calculateCommission = (
      node: ReferralNode,
      rates: number[],
      distribution: Record<string, number>
    ) => {
      if (node.level > 0 && node.level <= rates.length) {
        const commission = nftPrice * rates[node.level - 1];
        distribution[node.code] = (distribution[node.code] || 0) + commission;
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
    wallet: string,
    ticketPrice: number
  ): Promise<{
    totalCommission: number;
    commissionDistribution: Record<string, number>;
  }> {
    const commissionRates = [
      0.12, 0.06, 0.04, 0.02, 0.02, 0.01, 0.01, 0.005, 0.005, 0.005,
    ];
    const totalCommission = ticketPrice * 0.28;
    const referrals = await this.getReferrals(wallet);
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
