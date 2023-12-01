# ROI Project

This app and server are made to manage a Staff Contact Directory for Red Opal Innovations

## For ROI Managers:
1. Go to this link to find the .APK file and download it

https://github.com/whyitislouisa/ROIProject/releases/latest

2. Use a USB cable or other form of file transfer to move the file to your Android device

3. Use your device's in-built file explorer to open the APK file. You'll be prompted to install the app

4. The app should now install and be usable

## Cloning the Repository

To clone this repository to your local machine, open PowerShell and use the following command:

```bash
git clone https://github.com/whyitislouisa/ROIProject.git
```

## How to Run

1. After cloning the repository, navigate to it with:

```bash
cd ROIStaffDirectory
```

2. Go to the web server's folder

```bash
cd ROIStaffDirectory-service
```

3. Install dependencies

```bash
npm install
```

3. Open the folder in VS Code, and use `Run > Run without debugging` to start the server


4. Then go to the app's folder:

```bash
cd ROIStaffDirectory-app
```

5. Use `npm` to install the dependencies

```bash
npm install
```

2. Use Expo to start the app's server

```bash
npx expo start
```
