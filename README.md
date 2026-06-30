# Numeron

Numeron is an educational tool that generates random numbers and mathematical expressions for learners of all levels. It supports various difficulty levels and problem types, making it an ideal resource for practicing mathematics fundamentals.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Development](#development)
- [License](#license)

## Overview

Numeron is designed to support mathematical education by providing dynamically generated problems and expressions. The project is built with TypeScript and offers both web and desktop applications through Electron, making it accessible across different platforms.

## Features

- Generate random mathematical expressions with configurable difficulty levels
- Support for multiple problem types and educational scenarios
- Cross-platform availability (web and desktop)
- Type-safe implementation using TypeScript
- Responsive user interface with CSS styling
- Automated release workflows

## Installation

### Prerequisites

- Node.js (version 14.0 or higher)
- npm or yarn package manager

### Clone the Repository

```bash
git clone https://github.com/michael-borck/numeron.git
cd numeron
```

### Install Dependencies

```bash
npm install
```

Or if you prefer yarn:

```bash
yarn install
```

### Build the Project

```bash
npm run build
```

## Usage

### Web Application

To run the web application in development mode:

```bash
npm run dev --workspace=apps/web
```

The application will be available at `http://localhost:3000` (or your configured port).

### Desktop Application

To run the Electron desktop application:

```bash
npm run dev --workspace=apps/desktop
```

To build the desktop application for distribution:

```bash
npm run build --workspace=apps/desktop
```

### Generating Problems

Once the application is running, you can:

1. Select your desired difficulty level
2. Choose a problem type
3. Generate new problems and expressions
4. Work through the problems at your own pace

For more detailed specifications about problem generation, see [NUMERON_SPEC.md](NUMERON_SPEC.md).

## Project Structure

```
numeron/
├── apps/
│   ├── desktop/              # Electron desktop application
│   │   ├── src/
│   │   │   ├── main/         # Main process code
│   │   │   ├── preload/      # Preload scripts
│   │   │   └── renderer/     # Renderer process code
│   │   ├── electron-builder.yml
│   │   ├── electron-vite.config.ts
│   │   └── package.json
│   └── web/                  # Web application
│       └── src/
├── .github/
│   └── workflows/
│       └── release.yml       # Automated release workflow
├── NUMERON_SPEC.md           # Detailed specification
├── LICENSE                   # MIT License
├── package.json
└── README.md
```

## Configuration

### Prettier Formatting

The project uses Prettier for code formatting. Configuration files:
- `.prettierrc` - Main Prettier configuration
- `.prettierignore` - Files to ignore during formatting

### Git Configuration

- `.gitignore` - Specifies files and directories to ignore in version control

### Build Configuration

- **Desktop**: Configure the Electron builder in `apps/desktop/electron-builder.yml`
- **TypeScript**: Configure compilation settings in each `tsconfig.json`

## Development

### Code Style

This project follows consistent code style enforced by Prettier. Before committing, ensure your code is formatted:

```bash
npm run format
```

### Running Tests

```bash
npm run test
```

### Release Process

The project uses automated GitHub Actions workflows for releasing new versions. The workflow configuration can be found in `.github/workflows/release.yml`.

To create a release:

1. Update the version in `package.json`
2. Create a git tag matching the version
3. Push to the main branch
4. The automated workflow will handle the release

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

The MIT License allows for both commercial and private use, modification, and distribution, provided that the original copyright and license notice are included.

---

For more information or to report issues, please visit the [GitHub repository](https://github.com/michael-borck/numeron).