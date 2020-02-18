export class TestDto {
  get composeTest() {
    return this._composeTest.bind(this);
  }

  _composeTest(test) {
    const {
      _id: id,
      name,
      authorId,
      examQuestionsCount,
      description,
      published,
    } = test;

    return {
      id,
      name,
      authorId,
      examQuestionsCount,
      description,
      published,
    };
  }
}

export const testDto = new TestDto();
