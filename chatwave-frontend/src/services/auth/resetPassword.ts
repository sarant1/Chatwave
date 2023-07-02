import { Auth } from 'aws-amplify';

import { 
    ResetPasswordProps,
    ResetPasswordSupportingDataProps
} from '@/utils/validators/resetPassword.validator';

export async function resetPassword({ email, verificationCode, newPassword }: ResetPasswordProps & ResetPasswordSupportingDataProps) {
    try {
        await Auth.forgotPasswordSubmit(email, verificationCode, newPassword)
    } catch (err) {
        if (err instanceof Error) {
            throw err;
        }
    }
}