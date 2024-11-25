interface FlexProps
  extends React.HTMLAttributes<HTMLElement>,
    React.CSSProperties {
  as?: "div" | "main" | "nav";
  alignItems?: CSSProperties["alignItems"];
  justifyContent?: CSSProperties["justifyContent"];
  flexWrap?: CSSProperties["flexWrap"];
  gap?: CSSProperties["gap"];
  children: React.ReactNode;
}

interface GridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    React.CSSProperties,
    React.ReactNode {}

interface ReferralNode {
  id: string;
  name: string;
  level: number;
  code: string;
  children: ReferralNode[];
}

interface UserData {
  wallet: string;
  code: string;
  name: string;
  by: string;
  byParent: string;
}

interface ReferralData {
  wallet: string;
  code: string;
  by: string;
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

interface Collection {
  number: string;
  video: string;
  placeholder: string;
  tailwindClass: string;
}
