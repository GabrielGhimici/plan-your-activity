export interface UserData {
  userProfile: UserProfile;
  loading: boolean;
  error: any;
}

export interface UserProfile {
  name: string;
  email: string;
  born: any;
  firstLogin: boolean;
  team: any;
}
