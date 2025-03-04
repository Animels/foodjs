type AuthRes = {
  success: boolean;
  message: string;
};

type CheckRes = Omit<AuthRes, 'message'> & { message: boolean };

export type { AuthRes, CheckRes };
