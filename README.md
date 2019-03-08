
# pros-node-debugger-server

**Warning**: This project is still WIP, and many features **will** change in future.

A TypeScript server for **PROS v5** and [**pros-node-debugger-library**](https://github.com/kekland/pros-node-debugger-library) for wired *(wireless with RPi)* debugging, code uploading, etc.

## 🔧 Installation

### Prerequisites

- [**PROS for V5**](https://pros.cs.purdue.edu/) installed on where you will host the server (either your PC or Raspberry Pi attached to the brain).

### Copy the repository

```bash
git clone https://github.com/kekland/pros-node-debugger-server.git
cd pros-node-debugger-server
```

### Install the dependencies

```bash
npm i
```

### Configure the server

```bash
nano src/config/config.ts
# Edit the cliLocation to match the location of prosv5 executable
# Edit the projectLocation to match the location of your PROS project
```

### Build the server and run it

```bash
npm run build
npm run start:prod
```

## 👽 Usage

**Warning**: This project is still WIP, and many features **will** change in future.

### Running

```bash
npm run start:prod
```

### Viewing the data

When you run the project, the server will serve webpage ([pros-node-debugger-web](https://github.com/kekland/pros-node-debugger-web)) on port **8080**. You can open **localhost:8080** on your computer and it will connect to the server via **socket.io**.

### Connecting with phone

First, you need to get the IP address of your computer.

```bash
# Windows
ipconfig

# UNIX / Mac
ifconfig
```

Look for the address that starts with `192.168` (e.g. `192.168.1.103`). Then, open the browser on your phone and enter the address and the port (8080) as the link (for example, `192.168.1.103:8080`). It is advised that you use the phone in landscape mode, because the portrait mode is not supported yet.

## 📧 Contact me

**E-Mail**: kk.erzhan@gmail.com