import { body } from "express-validator";

const validateCreate = (entity) => {
  switch (entity) {
    case "author":
      return [
        body("firstName", "First name must not be empty")
          .trim()
          .isLength({ min: 1 })
          .escape(),
        body("familyName", "Family name must not be empty")
          .trim()
          .isLength({ min: 1 })
          .escape(),
        body("dateOfBirth", "Date of Birth must be valid")
          .optional({ checkFalsy: false })
          .isDate(),
        body("dateOfDeath", "Date of Death must be valid")
          .optional({ checkFalsy: false })
          .isDate(),
      ];
    case "book":
      return [
        body("title", "Title must not be empty")
          .trim()
          .isLength({ min: 1 })
          .escape(),
        body("author", "Author must not be empty")
          .trim()
          .isLength({ min: 1 })
          .escape(),
        body("publishedDate", "Published Date must be valid")
          .optional({ checkFalsy: false })
          .isDate(),
        body("isbn", "ISBN must not be empty")
          .trim()
          .isLength({ min: 1 })
          .escape(),
      ];
    case "genre":
      return [
        body("name", "Genre name must not be empty")
          .trim()
          .isLength({ min: 1 })
          .escape(),
      ];

    case "bookInstance":
      return [
        body("book", "book must not be empty.")
          .trim()
          .isLength({ min: 1 })
          .escape(),
        body("imprint", "imprint must not be empty.")
          .trim()
          .isLength({ min: 1 })
          .escape(),
      ];
    default:
      throw new Error(`Unknown entity: ${entity}`);
  }
};

export default validateCreate;
