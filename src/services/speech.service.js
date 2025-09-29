// Enhanced polyfills for Azure Speech SDK in Node.js environment
if (typeof window === "undefined") {
  global.window = {
    navigator: {
      userAgent: "Node.js",
      platform: "node",
      mediaDevices: {
        getUserMedia: () =>
          Promise.resolve({
            getAudioTracks: () => [],
            getTracks: () => [],
            stop: () => {},
          }),
        getSupportedConstraints: () => ({
          audio: true,
          video: false,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: true,
          sampleSize: true,
          channelCount: true,
        }),
        enumerateDevices: () =>
          Promise.resolve([
            {
              deviceId: "default",
              kind: "audioinput",
              label: "Default - Microphone",
              groupId: "default",
            },
          ]),
      },
    },
    document: {
      createElement: (tagName) => {
        const element = {
          addEventListener: () => {},
          removeEventListener: () => {},
          setAttribute: () => {},
          getAttribute: () => null,
          style: {},
          tagName: tagName.toUpperCase(),
          nodeType: 1,
          nodeName: tagName.toUpperCase(),
          appendChild: () => {},
          removeChild: () => {},
          insertBefore: () => {},
          cloneNode: () => element,
          hasAttribute: () => false,
          removeAttribute: () => {},
          click: () => {},
          focus: () => {},
          blur: () => {},
        };

        // Special handling for audio elements
        if (tagName.toLowerCase() === "audio") {
          Object.assign(element, {
            play: () => Promise.resolve(),
            pause: () => {},
            load: () => {},
            canPlayType: () => "probably",
            volume: 1,
            muted: false,
            paused: true,
            ended: false,
            currentTime: 0,
            duration: 0,
            playbackRate: 1,
            defaultPlaybackRate: 1,
            readyState: 4,
            networkState: 1,
            autoplay: false,
            loop: false,
            controls: false,
            crossOrigin: null,
            preload: "metadata",
            src: "",
            currentSrc: "",
          });
        }

        return element;
      },
      getElementById: () => null,
      getElementsByTagName: () => [],
      getElementsByClassName: () => [],
      querySelector: () => null,
      querySelectorAll: () => [],
      body: {
        appendChild: () => {},
        removeChild: () => {},
        insertBefore: () => {},
        style: {},
      },
      head: {
        appendChild: () => {},
        removeChild: () => {},
        insertBefore: () => {},
        style: {},
      },
    },
    location: {
      href: "file:///",
      protocol: "file:",
      host: "",
      hostname: "",
      port: "",
      pathname: "/",
      search: "",
      hash: "",
      origin: "file://",
    },
    addEventListener: () => {},
    removeEventListener: () => {},
    setTimeout: global.setTimeout,
    clearTimeout: global.clearTimeout,
    setInterval: global.setInterval,
    clearInterval: global.clearInterval,
    requestAnimationFrame: (callback) => global.setTimeout(callback, 16),
    cancelAnimationFrame: global.clearTimeout,
    // Add console methods if not available
    console: global.console || {
      log: () => {},
      error: () => {},
      warn: () => {},
      info: () => {},
      debug: () => {},
    },
    AudioContext: class AudioContext {
      constructor() {
        this.state = "running";
        this.sampleRate = 16000;
        this.currentTime = 0;
        this.listener = {
          setPosition: () => {},
          setOrientation: () => {},
        };
        this.destination = {
          connect: () => {},
          disconnect: () => {},
          channelCount: 2,
          channelCountMode: "explicit",
          channelInterpretation: "speakers",
        };
      }
      createMediaStreamSource(stream) {
        return {
          connect: () => {},
          disconnect: () => {},
          mediaStream: stream,
        };
      }
      createGain() {
        return {
          connect: () => {},
          disconnect: () => {},
          gain: {
            value: 1,
            setValueAtTime: () => {},
            linearRampToValueAtTime: () => {},
            exponentialRampToValueAtTime: () => {},
          },
        };
      }
      createScriptProcessor(
        bufferSize = 4096,
        inputChannels = 1,
        outputChannels = 1
      ) {
        return {
          connect: () => {},
          disconnect: () => {},
          onaudioprocess: null,
          bufferSize,
          numberOfInputs: inputChannels,
          numberOfOutputs: outputChannels,
        };
      }
      createAnalyser() {
        return {
          connect: () => {},
          disconnect: () => {},
          fftSize: 2048,
          frequencyBinCount: 1024,
          minDecibels: -100,
          maxDecibels: -30,
          smoothingTimeConstant: 0.8,
          getByteFrequencyData: () => {},
          getByteTimeDomainData: () => {},
          getFloatFrequencyData: () => {},
          getFloatTimeDomainData: () => {},
        };
      }
      decodeAudioData(audioData) {
        return Promise.resolve({
          length: 44100,
          sampleRate: 44100,
          numberOfChannels: 1,
          duration: 1,
          getChannelData: () => new Float32Array(44100),
        });
      }
      suspend() {
        this.state = "suspended";
        return Promise.resolve();
      }
      resume() {
        this.state = "running";
        return Promise.resolve();
      }
      close() {
        this.state = "closed";
        return Promise.resolve();
      }
    },
    webkitAudioContext: class webkitAudioContext {
      constructor() {
        this.state = "running";
        this.sampleRate = 16000;
        this.currentTime = 0;
        this.listener = {
          setPosition: () => {},
          setOrientation: () => {},
        };
        this.destination = {
          connect: () => {},
          disconnect: () => {},
          channelCount: 2,
          channelCountMode: "explicit",
          channelInterpretation: "speakers",
        };
      }
      createMediaStreamSource(stream) {
        return {
          connect: () => {},
          disconnect: () => {},
          mediaStream: stream,
        };
      }
      createGain() {
        return {
          connect: () => {},
          disconnect: () => {},
          gain: {
            value: 1,
            setValueAtTime: () => {},
            linearRampToValueAtTime: () => {},
            exponentialRampToValueAtTime: () => {},
          },
        };
      }
      createScriptProcessor(
        bufferSize = 4096,
        inputChannels = 1,
        outputChannels = 1
      ) {
        return {
          connect: () => {},
          disconnect: () => {},
          onaudioprocess: null,
          bufferSize,
          numberOfInputs: inputChannels,
          numberOfOutputs: outputChannels,
        };
      }
      createAnalyser() {
        return {
          connect: () => {},
          disconnect: () => {},
          fftSize: 2048,
          frequencyBinCount: 1024,
          minDecibels: -100,
          maxDecibels: -30,
          smoothingTimeConstant: 0.8,
          getByteFrequencyData: () => {},
          getByteTimeDomainData: () => {},
          getFloatFrequencyData: () => {},
          getFloatTimeDomainData: () => {},
        };
      }
      decodeAudioData(audioData) {
        return Promise.resolve({
          length: 44100,
          sampleRate: 44100,
          numberOfChannels: 1,
          duration: 1,
          getChannelData: () => new Float32Array(44100),
        });
      }
      suspend() {
        this.state = "suspended";
        return Promise.resolve();
      }
      resume() {
        this.state = "running";
        return Promise.resolve();
      }
      close() {
        this.state = "closed";
        return Promise.resolve();
      }
    },
    // Add additional globals that might be needed
    URL: class URL {
      constructor(url, base) {
        this.href = url;
        this.protocol = "https:";
        this.host = "localhost";
        this.hostname = "localhost";
        this.port = "";
        this.pathname = "/";
        this.search = "";
        this.hash = "";
        this.origin = "https://localhost";
      }
      toString() {
        return this.href;
      }
    },
    Blob: class Blob {
      constructor(parts = [], options = {}) {
        this.size = 0;
        this.type = options.type || "";
        this.parts = parts;
      }
      slice() {
        return new Blob();
      }
      stream() {
        return new ReadableStream();
      }
      text() {
        return Promise.resolve("");
      }
      arrayBuffer() {
        return Promise.resolve(new ArrayBuffer(0));
      }
    },
    File: class File {
      constructor(parts, name, options = {}) {
        this.name = name;
        this.size = 0;
        this.type = options.type || "";
        this.lastModified = Date.now();
        this.parts = parts;
      }
      slice() {
        return new File([], this.name);
      }
      stream() {
        return new ReadableStream();
      }
      text() {
        return Promise.resolve("");
      }
      arrayBuffer() {
        return Promise.resolve(new ArrayBuffer(0));
      }
    },
  };
  global.document = global.window.document;
  global.navigator = global.window.navigator;
  global.AudioContext = global.window.AudioContext;
  global.webkitAudioContext = global.window.webkitAudioContext;
  global.URL = global.window.URL;
  global.Blob = global.window.Blob;
  global.File = global.window.File;

  // Additional polyfills that might be needed
  if (!global.performance) {
    global.performance = {
      now: () => Date.now(),
      mark: () => {},
      measure: () => {},
      clearMarks: () => {},
      clearMeasures: () => {},
      getEntriesByName: () => [],
      getEntriesByType: () => [],
    };
  }

  if (!global.crypto) {
    global.crypto = {
      getRandomValues: (arr) => {
        for (let i = 0; i < arr.length; i++) {
          arr[i] = Math.floor(Math.random() * 256);
        }
        return arr;
      },
    };
  }
}

const sdk = require("microsoft-cognitiveservices-speech-sdk");
const recorder = require("node-record-lpcm16");
const { EventEmitter } = require("events");
const { spawn } = require("child_process");
const logger = require("../core/logger").createServiceLogger("SPEECH");
const config = require("../core/config");

class SpeechService extends EventEmitter {
  constructor() {
    super();
    this.recognizer = null;
    this.isRecording = false;
    this.audioConfig = null;
    this.speechConfig = null;
    this.sessionStartTime = null;
    this.retryCount = 0;
    this.maxRetries = 3;
    this.pushStream = null;
    this.recording = null;

    this.initializeClient();
  }

  initializeClient() {
    try {
      // Get Azure Speech credentials from environment variables
      const subscriptionKey = process.env.AZURE_SPEECH_KEY;
      const region = process.env.AZURE_SPEECH_REGION;

      if (!subscriptionKey || !region) {
        const error =
          "Azure Speech credentials not found. Please set AZURE_SPEECH_KEY and AZURE_SPEECH_REGION environment variables.";
        logger.error("Speech service initialization failed", {
          reason: "missing_credentials",
        });
        this.emit("error", error);
        return;
      }

      // Validate region format
      const validRegions = [
        "eastus",
        "westus",
        "westus2",
        "eastus2",
        "centralus",
        "northcentralus",
        "southcentralus",
        "westcentralus",
        "canadacentral",
        "canadaeast",
        "brazilsouth",
        "northeurope",
        "westeurope",
        "uksouth",
        "ukwest",
        "francecentral",
        "germanywestcentral",
        "norwayeast",
        "switzerlandnorth",
        "switzerlandwest",
        "swedencentral",
        "uaenorth",
        "southafricanorth",
        "centralindia",
        "southindia",
        "westindia",
        "eastasia",
        "southeastasia",
        "japaneast",
        "japanwest",
        "koreacentral",
        "koreasouth",
        "australiaeast",
        "australiasoutheast",
      ];

      if (!validRegions.includes(region.toLowerCase())) {
        logger.warn("Potentially invalid Azure region specified", { region });
      }

      // Initialize Azure Speech configuration
      this.speechConfig = sdk.SpeechConfig.fromSubscription(
        subscriptionKey,
        region
      );

      // Configure speech recognition settings with better defaults
      const azureConfig = config.get("speech.azure") || {};
      this.speechConfig.speechRecognitionLanguage =
        azureConfig.language || "en-US";
      this.speechConfig.outputFormat = sdk.OutputFormat.Detailed;

      // Set additional properties for better recognition
      this.speechConfig.setProperty(
        sdk.PropertyId.SpeechServiceConnection_InitialSilenceTimeoutMs,
        "5000"
      );
      this.speechConfig.setProperty(
        sdk.PropertyId.SpeechServiceConnection_EndSilenceTimeoutMs,
        "2000"
      );
      this.speechConfig.setProperty(
        sdk.PropertyId.Speech_SegmentationSilenceTimeoutMs,
        "2000"
      );

      if (azureConfig.enableDictation) {
        this.speechConfig.enableDictation();
      }

      if (azureConfig.enableAudioLogging) {
        this.speechConfig.enableAudioLogging();
      }

      logger.info("Azure Speech service initialized successfully", {
        region,
        language: azureConfig.language || "en-US",
      });

      this.emit("status", "Azure Speech Services ready");
    } catch (error) {
      logger.error("Failed to initialize Azure Speech client", {
        error: error.message,
        stack: error.stack,
      });
      this.emit("error", `Speech recognition unavailable: ${error.message}`);
    }
  }

  startRecording() {
    try {
      if (!this.speechConfig) {
        const errorMsg = "Azure Speech client not initialized";
        logger.error(errorMsg);
        this.emit("error", errorMsg);
        return;
      }

      if (this.isRecording) {
        logger.warn("Recording already in progress");
        return;
      }

      this.sessionStartTime = Date.now();
      this.retryCount = 0;

      this._attemptRecording();
    } catch (error) {
      logger.error("Critical error in startRecording", {
        error: error.message,
        stack: error.stack,
      });
      this.emit(
        "error",
        `Speech recognition failed to start: ${error.message}`
      );
      this.isRecording = false;
    }
  }

  _startMicrophoneCapture() {
    try {
      if (this.recording) {
        this.recording.kill();
        this.recording = null;
      }

      // Create push stream for Azure
      this.pushStream = sdk.AudioInputStream.createPushStream();
      this.audioConfig = sdk.AudioConfig.fromStreamInput(this.pushStream);

      // 🔹 spawn SoX directly
      const deviceName = "Stereo Mix (Realtek(R) Audio)"; // safe for system audio

      this.recording = spawn("sox", [
        "-t",
        "waveaudio",
        deviceName,
        "-r",
        "16000",
        "-c",
        "1",
        "-b",
        "16",
        "-e",
        "signed-integer",
        "-t",
        "wavpcm",
        "-",
      ]);

      // Pipe data into Azure PushStream
      this.recording.stdout.on("data", (chunk) => {
        this.pushStream.write(chunk);
      });

      this.recording.stderr.on("data", (data) => {
        console.error("SoX STDERR:", data.toString());
      });

      this.recording.on("close", (code) => {
        console.log(`SoX exited with code ${code}`);
        if (this.pushStream) this.pushStream.close();
      });

      console.log("Microphone capture started (via SoX)");
    } catch (err) {
      console.error("Failed to start microphone capture:", err.message);
    }
  }

  _attemptRecording() {
    try {
      if (this.isRecording) return;

      this.isRecording = true;
      this.emit("recording-started");

      this._cleanup();

      // Create new push stream
      this.pushStream = sdk.AudioInputStream.createPushStream();
      this.audioConfig = sdk.AudioConfig.fromStreamInput(this.pushStream);

      // 🔹 call microphone capture
      this._startMicrophoneCapture();

      // Setup Azure recognizer
      this.recognizer = new sdk.SpeechRecognizer(
        this.speechConfig,
        this.audioConfig
      );

      this.recognizer.recognizing = (s, e) => {
        if (e.result.reason === sdk.ResultReason.RecognizingSpeech) {
          this.emit("interim-transcription", e.result.text);
        }
      };

      this.recognizer.recognized = (s, e) => {
        if (
          e.result.reason === sdk.ResultReason.RecognizedSpeech &&
          e.result.text.trim()
        ) {
          this.emit("transcription", e.result.text);
        }
      };

      this.recognizer.canceled = (s, e) => {
        console.warn("Recognition canceled", e.reason, e.errorDetails);
        this.stopRecording();
      };

      this.recognizer.startContinuousRecognitionAsync(
        () => console.log("Continuous recognition started"),
        (err) => {
          console.error("Failed to start recognition:", err);
          this.stopRecording();
        }
      );
    } catch (error) {
      console.error("Failed to start recording session:", error);
      this.isRecording = false;
      this.emit("error", `Recording failed: ${error.message}`);
    }
  }

  stopRecording() {
    if (!this.isRecording) {
      return;
    }

    this.isRecording = false;
    const sessionDuration = this.sessionStartTime
      ? Date.now() - this.sessionStartTime
      : 0;

    logger.info("Stopping speech recognition session", {
      sessionDuration: `${sessionDuration}ms`,
    });

    // Stop continuous recognition
    if (this.recognizer) {
      try {
        this.recognizer.stopContinuousRecognitionAsync(
          () => {
            logger.info("Speech recognition stopped successfully");
            this.emit("recording-stopped");
            this.emit("status", "Recording stopped");
            if (global.windowManager) {
              global.windowManager.handleRecordingStopped();
            }
            this._cleanup();
          },
          (error) => {
            logger.error("Error during recognition stop", {
              error: error.toString(),
            });
            this._cleanup();
          }
        );
      } catch (error) {
        logger.error("Error stopping recognizer", { error: error.message });
        this._cleanup();
      }
    } else {
      this._cleanup();
    }
  }

  _cleanup() {
    // Clean up recognizer
    if (this.recognizer) {
      try {
        this.recognizer.close();
      } catch (error) {
        logger.error("Error closing recognizer", { error: error.message });
      }
      this.recognizer = null;
    }

    // Clean up audio config
    if (this.audioConfig) {
      try {
        if (typeof this.audioConfig.close === "function") {
          this.audioConfig.close(); // synchronous in Node
        }
      } catch (error) {
        console.error("Error closing audio config:", error.message);
      }
      this.audioConfig = null;
    }

    // Stop audio recording
    if (this.recording) {
      try {
        if (!this.recording.killed) {
          this.recording.kill(); // kill spawned SoX process
        }
      } catch (error) {
        logger.error("Error stopping audio recording", {
          error: error.message,
        });
      }
      this.recording = null;
    }

    // Clean up push stream
    if (this.pushStream) {
      try {
        if (typeof this.pushStream.close === "function") {
          this.pushStream.close(); // synchronous in Node
        }
      } catch (error) {
        logger.error("Error closing push stream", { error: error.message });
      }
      this.pushStream = null;
    }

    // Reset audio data logging flag
    this._audioDataLogged = false;
  }

  async recognizeFromFile(audioFilePath) {
    if (!this.speechConfig) {
      throw new Error("Speech service not initialized");
    }

    const startTime = Date.now();

    try {
      // Validate file exists and is readable
      const fs = require("fs");
      if (!fs.existsSync(audioFilePath)) {
        throw new Error(`Audio file not found: ${audioFilePath}`);
      }

      const audioConfig = sdk.AudioConfig.fromWavFileInput(audioFilePath);
      const recognizer = new sdk.SpeechRecognizer(
        this.speechConfig,
        audioConfig
      );

      const result = await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error("File recognition timeout"));
          recognizer.close();
        }, 30000); // 30 second timeout

        recognizer.recognizeOnceAsync(
          (result) => {
            clearTimeout(timeout);
            if (result.reason === sdk.ResultReason.RecognizedSpeech) {
              resolve(result.text);
            } else if (result.reason === sdk.ResultReason.NoMatch) {
              resolve(""); // No speech detected in file
            } else {
              reject(new Error(`File recognition failed: ${result.reason}`));
            }
            recognizer.close();
            audioConfig.close();
          },
          (error) => {
            clearTimeout(timeout);
            reject(new Error(`File recognition error: ${error}`));
            recognizer.close();
            audioConfig.close();
          }
        );
      });

      logger.logPerformance("File speech recognition", startTime, {
        filePath: audioFilePath,
        textLength: result.length,
      });

      return result;
    } catch (error) {
      logger.error("File recognition failed", {
        filePath: audioFilePath,
        error: error.message,
      });
      throw error;
    }
  }

  getStatus() {
    return {
      isRecording: this.isRecording,
      isInitialized: !!this.speechConfig,
      sessionDuration: this.sessionStartTime
        ? Date.now() - this.sessionStartTime
        : 0,
      retryCount: this.retryCount,
      config: config.get("speech.azure") || {},
    };
  }
}

module.exports = new SpeechService();
