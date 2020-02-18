import { userDto } from '../user/user.dto';
const { composeUser } = userDto;

export class AuthDto {
  composeAuthUser(user, token) {
    return {
      user: composeUser(user).user,
      token,
    };
  }
}

export const authDto = new AuthDto();
