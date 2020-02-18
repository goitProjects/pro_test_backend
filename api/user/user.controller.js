import { OK } from 'http-status-codes';
import { userDto } from './user.dto';
const { composeUser } = userDto;

export class UserController {
  get getLoggedUser() {
    return this._getLoggedUser.bind(this);
  }

  _getLoggedUser(req, res) {
    return res.status(OK).json(composeUser(req.user));
  }
}
