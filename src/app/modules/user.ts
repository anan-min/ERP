enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  BANNED = 'banned',
}

interface User {
  user_id: number;
  username: string;
  email: string;
  phone_number?: string;
  status: UserStatus;
  last_login: Date;
  created_at: Date;
  updated_at: Date;
}
