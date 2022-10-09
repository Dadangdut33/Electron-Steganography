<p align="center">
    <img src="https://github.com/Dadangdut33/Electron-Steganography/blob/master/src/assets/Logo.png?raw=true" width="250px" alt="Electron Steganography Logo">
</p>

<h1 align="center"> Electron-Steganography</h1>

<p align="center">
    <a href="https://github.com/Dadangdut33/Electron-Steganography/issues"><img alt="GitHub issues" src="https://img.shields.io/github/issues/Dadangdut33/Electron-Steganography"></a>
    <a href="https://github.com/Dadangdut33/Electron-Steganography/pulls"><img alt="GitHub pull requests" src="https://img.shields.io/github/issues-pr/Dadangdut33/Electron-Steganography"></a>
    <a href="https://github.com/Dadangdut33/Electron-Steganography/releases/latest"><img alt="github downloads"  src="https://img.shields.io/github/downloads/Dadangdut33/Electron-Steganography/total?label=downloads"></a>
   <br>
    <a href="https://github.com/Dadangdut33/Electron-Steganography/releases/latest"><img alt="GitHub release (latest SemVer)" src="https://img.shields.io/github/v/release/Dadangdut33/Electron-Steganography"></a>
    <a href="https://github.com/Dadangdut33/Electron-Steganography/commits/main"><img alt="GitHub commits since latest release (by date)" src="https://img.shields.io/github/commits-since/Dadangdut33/Electron-Steganography/latest"></a><Br>
    <a href="https://github.com/Dadangdut33/Electron-Steganography/stargazers"><img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/Dadangdut33/Electron-Steganography?style=social"></a>
    <a href="https://github.com/Dadangdut33/Electron-Steganography/network/members"><img alt="GitHub forks" src="https://img.shields.io/github/forks/Dadangdut33/Electron-Steganography?style=social"></a>
</p>

Steganography desktop app made with electron and CryptoStego

## Installation

1. Download the latest release from [GitHub](https://github.com/Dadangdut33/Electron-Steganography/releases/latest)
2. Extract/Install
3. Run the program

## Uninstallation

Run the uninstaller if you are using the installer version. If using the portable version, you can just delete the folder.

## Development

This project uses yarn so please use `yarn` to install all the packages. To start developing you can use `yarn start` and to build the app you can use `yarn build`.

### Watch ts file changes

For easier development on the main process, if you want to watch ts file changes, you can run 2 terminals and use `yarn watch` while also running `yarn start` and it will automatically compile the ts files to js files.

### Compiling

I use wsl to compile it on linux, the command is the same as the windows just do `yarn make`, but you might need to install `fakeroot`, `dpg`, and `rpm` if you haven't. For specific architecture you can add `--arch=x64` or `--arch=ia32` to the command.

```bash
# ia32
yarn make --arch=ia32

# x64
yarn make --arch=x64
```

If error keeps popping out when trying to compile on linux, try to install the packages using `npm install` instead of `yarn install`.

# Reporting Bugs/Feature Request

If you encounter any bugs with the program, you can report them by opening an issue on the github repository. You can also request a feature by opening an issue.

# Dislaimer

Because of [cryptostego](https://github.com/zeruniverse/CryptoStego) license. This application is also licensed under the [GNU General Public License v3.0](./LICENSE).

GNU AGPL v3.0 or later (GNU GPL v3.0 license allowed for non-commercial purposes but derived / re-distributed work must apply same license as this project or pure AGPL v3.0)
