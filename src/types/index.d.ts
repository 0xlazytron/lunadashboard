interface ReferralNode {
  id: string;
  name: string;
  level: number;
  userId: string;
  children: ReferralNode[];
}

interface UserData {
  userId: string;
  referralCode: string;
  characterName: string;
  by: string;
  byParent: string;
}

interface WalletData {
  userId: string;
  wallet: string;
  character: string;
}

interface Referral {
  id: string;
  userId: string;
  level: number;
  name: string;
  data: any;
}
