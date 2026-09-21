# CyrefJS

**Small, predictable, and reusable utilities for JavaScript and TypeScript.**

CyrefJS is a modern, lightweight utility library designed to provide practical helpers for everyday JavaScript and TypeScript development.

It focuses on **simple APIs, strong TypeScript support, zero runtime dependencies, and predictable behavior**.

---

## ✨ Features

-  Small and focused utilities
-  ESM-first package
-  Full TypeScript declarations
-  Predictable and consistent APIs
-  Category-based subpath imports
-  Thoroughly tested with Vitest
-  Zero runtime dependencies
-  Lightweight and tree-shaking friendly
-  Built with modern TypeScript

---

## 📦 Installation

```bash
npm install @cyref/js
```

Or with other package managers:

```bash
pnpm add @cyref/js
```

```bash
yarn add @cyref/js
```

```bash
bun add @cyref/js
```

---

## 🚀 Usage

You can import utilities directly from the main package:

```ts
import { chunk, capitalize, clamp } from "@cyref/js";

const items = [1, 2, 3, 4, 5, 6];

chunk(items, 2);
// [[1, 2], [3, 4], [5, 6]]

capitalize("hello world");
// "Hello world"

clamp(150, 0, 100);
// 100
```

CyrefJS also supports category-based imports.

```ts
import { chunk, shuffle } from "@cyref/js/array";
import { debounce, throttle } from "@cyref/js/function";
import { clamp, lerp } from "@cyref/js/number";
```

This allows you to keep imports explicit and organized.

---

## 🗂️ Utilities

CyrefJS utilities are organized into focused categories.

### Array

Utilities for working with arrays and collections.

```ts
import {
  chunk,
  compact,
  difference,
  flatten,
  groupBy,
  shuffle,
  unique,
} from "@cyref/js/array";
```

Includes utilities for:

- Chunking
- Flattening
- Filtering
- Grouping
- Taking and dropping items
- Uniqueness
- Set-like operations
- Sampling
- Shuffling
- Zipping and unzipping

---

### Date

Small helpers for common date operations.

```ts
import {
  addDays,
  differenceInDays,
  startOfDay,
  endOfDay,
} from "@cyref/js/date";
```

Includes:

- Date arithmetic
- Date comparison
- Day boundaries
- Date validation
- Difference calculations

---

### Function

Utilities for composing and controlling functions.

```ts
import {
  compose,
  debounce,
  memoize,
  once,
  pipe,
  throttle,
} from "@cyref/js/function";
```

Includes:

- Composition
- Piping
- Currying
- Memoization
- Debouncing
- Throttling
- Partial application
- Function helpers

---

### Number

Utilities for working with numbers.

```ts
import { clamp, lerp, randomInt, roundTo } from "@cyref/js/number";
```

Includes:

- Clamping
- Rounding
- Interpolation
- Random integers
- Percentages
- Floor and ceiling helpers

---

### Object

Utilities for working with objects.

```ts
import { get, has, merge, omit, pick, set } from "@cyref/js/object";
```

Includes:

- Object access
- Deep cloning
- Merging
- Picking and omitting properties
- Mapping keys and values
- Nested property operations

---

### String

Utilities for formatting and transforming strings.

```ts
import {
  camelCase,
  kebabCase,
  pascalCase,
  snakeCase,
  slugify,
} from "@cyref/js/string";
```

Includes:

- Case conversion
- Slug generation
- Capitalization
- Whitespace normalization
- Padding
- Truncation
- String transformations

---

### Type

Small runtime type-checking utilities.

```ts
import {
  isArray,
  isBoolean,
  isDate,
  isFunction,
  isNumber,
  isString,
} from "@cyref/js/type";
```

Includes checks for:

- Arrays
- Booleans
- Dates
- Functions
- Numbers
- Strings
- Objects
- Regular expressions
- `null`
- `undefined`

---

### URL

Utilities for working with URLs and query parameters.

```ts
import {
  buildQuery,
  getQueryParam,
  parseQuery,
  setQueryParam,
} from "@cyref/js/url";
```

Includes:

- Query string creation
- Query parsing
- Reading parameters
- Setting parameters
- Removing parameters

---

### Validation

Small validation helpers for common use cases.

```ts
import {
  isEmail,
  isInteger,
  isPositive,
  isStrongPassword,
  isURL,
} from "@cyref/js/validation";
```

Includes:

- Email validation
- URL validation
- Integer validation
- Positive number validation
- Password strength validation

---

## 🔷 TypeScript

CyrefJS is written in TypeScript and ships with complete type declarations.

```ts
import { chunk } from "@cyref/js";

const result = chunk([1, 2, 3, 4], 2);
```

Type information is included automatically, so no additional `@types` package is required.

---

## 🧩 Subpath Imports

CyrefJS provides category-based subpath exports:

```text
@cyref/js
@cyref/js/array
@cyref/js/date
@cyref/js/function
@cyref/js/number
@cyref/js/object
@cyref/js/string
@cyref/js/type
@cyref/js/url
@cyref/js/validation
```

For example:

```ts
import { clamp } from "@cyref/js/number";
```

Instead of:

```ts
import { clamp } from "@cyref/js";
```

Both approaches are supported.

---

## 🌳 Tree Shaking

CyrefJS is designed with modern ESM tooling in mind.

Because utilities are exported as individual functions and the package has no runtime dependencies, modern bundlers can efficiently remove unused code from production builds.

```ts
import { clamp } from "@cyref/js/number";
```

Use only what you need.

---

## 🧪 Testing

CyrefJS uses [Vitest](https://vitest.dev/) for testing.

Run the test suite:

```bash
npm test
```

Run tests once:

```bash
npm run test:run
```

Run tests in watch mode:

```bash
npm run test:watch
```

---

## 🛠️ Development

Clone the repository:

```bash
git clone https://github.com/VibelessYoung/CyrefJS.git
cd CyrefJS
```

Install dependencies:

```bash
npm install
```

Run type checking:

```bash
npm run typecheck
```

Build the package:

```bash
npm run build
```

Run the complete release check:

```bash
npm run release:check
```

---

## 📁 Project Structure

```text
CyrefJS/
├── src/
│   ├── array/
│   ├── date/
│   ├── function/
│   ├── number/
│   ├── object/
│   ├── string/
│   ├── type/
│   ├── url/
│   ├── validation/
│   └── index.ts
│
├── tests/
│   ├── array/
│   ├── date/
│   ├── function/
│   ├── number/
│   ├── object/
│   ├── string/
│   ├── type/
│   ├── url/
│   └── validation/
│
├── CHANGELOG.md
├── CONTRIBUTING.md
├── LICENSE
├── README.md
├── SECURITY.md
├── package.json
└── tsconfig.json
```

---

## 📚 Documentation

Documentation and examples are planned to live alongside the project and will provide detailed information for each utility.

Until then, the TypeScript declarations and source code provide a reliable reference for the available APIs.

---

## 🤝 Contributing

Contributions are welcome.

If you'd like to improve CyrefJS:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Add or update tests.
5. Run the type checker and test suite.
6. Open a pull request.

Please read [`CONTRIBUTING.md`](./CONTRIBUTING.md) before contributing.

---

## 🔐 Security

If you discover a security issue, please follow the instructions in [`SECURITY.md`](./SECURITY.md).

Please avoid opening public issues for undisclosed security vulnerabilities.

---

## 📄 License

CyrefJS is open source software licensed under the [MIT License](./LICENSE).

---

## 🔗 Links

- **Repository:** https://github.com/VibelessYoung/CyrefJS
- **Issues:** https://github.com/VibelessYoung/CyrefJS/issues
- **npm:** https://www.npmjs.com/package/@cyref/js

---

<div align="center">

### Built for simple code. Designed for everyday use.

**CyrefJS**

</div>
