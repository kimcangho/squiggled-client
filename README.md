# kent-ho-capstone-client

## This is the client-side of the Qual web application. Ensure that two browser windows are open to simulate broadcaster/viewer interaction.

# Initialization
1. Install
> npm install
2. Start React App
> npm start

# Camera Indicators (bottom right on video element)
Red broadcast icon: user is broadcasting live stream to viewer
Green view icon: user is viewing broadcaster stream
# Session Button
Start session: opens new session
End session: quits current session (kicks peer if also in session)
# Control Panel Legend Icons
Take screenshot: takes user's screenshot
Send screenshot: sends screenshot to peer
Download screenshot: downloads screenshot locally
Draw Mode Enabled: indicates drawable canvas/screenshot
Clear Screenshot: clears entire canvas
Muted: No audio
Unmuted: Max audio

# Peer Interaction
1. Peer A (Broadcaster) creates session.
2. Peer B (Viewer) can join by clicking phone icon in side container (modal menu if in mobile view).
3. Peer A receives notification in side container and accepts by clicking phone icon.
4. Peer B joins call and can view Peer A's stream.
5. Peer A takes screenshot and can add annotations on screenshot.
6. Peer A sends screenshot to Peer B.
7. Peer B may add annotations to sent screenshot.
8. Peer B sends back annotated screenshot to Peer A.

### Note: Draw mode not enabled if no screenshot is present.
### Note: Download/Send options available when screenshot is present.
### Note: Ending session will remove both peers from session.