## Screen Recorder
A feature-rich screen recording and snapshot tool built using JavaScript, HTML, and CSS. This project enables users to record their video/audio streams and take snapshots directly from the browser using the MediaStream API and Canvas API.

# Features
1. Record Video/Audio: Captures video and audio from the user's media devices.
2. Take Snapshots: Capture frames as images from the video stream.
3. Live Timer: Displays the duration of the recording in real-time.
4. Download Media: Save the recorded video or captured snapshots directly to your device.

# Technologies Used
1. HTML5: Provides the structure for the application.
2. CSS3: Styles the interface and adds animations to buttons.
3. JavaScript: Implements core functionality like media recording and capturing.
4. MediaStream API: Accesses the user's video/audio streams.
5. Canvas API: Captures and processes individual video frames.


## Getting Started
# Prerequisites
1. A modern web browser (e.g., Chrome, Firefox, Edge) with support for the MediaStream API.
2. A webcam and microphone for testing the video/audio recording feature.


# How It Works
Recording Video
1. Click the Record Button to start recording the video/audio stream.
2. The timer starts automatically, displaying the duration of the recording.
3. Click the Record Button again to stop the recording.
4. The recorded video file is downloaded as stream.mp4.

# Capturing Snapshots
1. Click the Capture Button to take a snapshot of the video stream.
2. The captured image is downloaded as Image.jpeg.


## File Structure
screen-recorder/
│
├── index.html       # Main HTML file
├── style.css        # Styling for the application
├── index.js         # JavaScript for recording and capturing functionality
└── README.md        # Project documentation

