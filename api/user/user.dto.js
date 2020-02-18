export class UserDto {
  composeUser(user) {
    const { _id: userId, name, email, createdAt } = user;
    return {
      user: {
        id: userId,
        name,
        email,
        createdAt: createdAt.toISOString(),
      },
    };
  }
}

export const userDto = new UserDto();
