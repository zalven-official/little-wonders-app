import CryptoJS from "crypto-js"
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import html2canvas from 'html2canvas-pro'
import jsPDF from 'jspdf';


/**
 * Generates a fallback name based on the provided full name.
 * The fallback name consists of the initial letters of the first one or two words.
 * @param fullName The full name from which to generate the fallback.
 * @returns The generated fallback name.
 */
export function generateFallbackName(fullName: string): string {
  const words = fullName.split(" ")
  let fallback = "";
  for (let index = 0; index < words.length && fallback.length < 2; index++) {
    const word = words[index];
    fallback += word.charAt(0);
    if (fallback.length >= 2) {
      break;
    }
    if (word.length > 1) {
      fallback += word.charAt(1);
    }
  }
  return fallback.toUpperCase();
}

/**
 * Converts a given Date object into a human-readable relative time string.
 * The output format mimics the relative time display used by social media platforms.
 * @param {Date} date The Date object representing the timestamp to convert.
 * @returns {string} A human-readable relative time string (e.g., "just now", "5 minutes ago", "yesterday", etc.).
 */
export function readableTime(date: Date | string): string {
  const now = new Date();
  const diff = now.getTime() - new Date(date).getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return "just now";
  } else if (minutes === 1) {
    return "a minute ago";
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours === 1) {
    return "an hour ago";
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else if (days === 1) {
    return "yesterday";
  } else if (days < 7) {
    return `${days} days ago`;
  } else {
    // For dates older than a week, return a formatted date string
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString(undefined, options);
  }
}

/**
 * Executes a callback function when the Enter key is pressed without the Shift key.
 * Prevents the default behavior of the Enter key.
 *
 * @param {KeyboardEvent} event - The keyboard event object.
 * @param {() => void} callback - The callback function to execute when Enter is pressed without Shift.
 * @returns {void}
 */
export function onSubmitEnter(
  event: KeyboardEvent,
  callback: () => void
): void {
  if (!event.shiftKey) {
    callback();
  }
}

function token(): string {
  return stringToHash(
    "2Po0hyFmqEGvHqAPYze9ogKvobG8PsgAklIHBcKEqR29KIut3fp1PBp74mTXP6c4C2yuVfCxg6ES4W85JE3BXl1ueqETAYw7EuFr7xKUIqoOOcqpC8U8xhmC9MCDVUIQIAZ8kTm7Ue8uDv3gPAWj8PvbpQ3SaLpcoBhkFhaAUZ2OtaGRjiDfWR5PBz20CZGOBYt3qzSTDOzuwL0YmEPQHvQXVJBrWuF0h3BLhLgGMlWGkJLZW28CJP6opLBvqM96ZmqHW9ULwmw7LYLKrp84lrdU5EYXGrhtLaeuakuRzC93GcqgWZSX957bHZ19dRioPrCWJOetGCDg5RFCFfJsdWbPrMCgcwKmasCqsP4TTSUqwiMF9Z9ad1jsHQflz82tUsZAqLYqWLzVwZFsCJPyaMaVIJ424p1974SKRugwOJOKCUQa5pROo6AoxJsH3C5c1l8p2MDgxwsYSjVwAtb5awpHo1Y0qVF90pGLmsE5qW9xKDm4TxMdsVeysHgb7yBL"
  );
}

/**
 * Decrypts a string using AES encryption.
 * @param {string} value - The encrypted string to decrypt.
 * @returns {string} The decrypted string.
 */
export function decodeString(value: string): string {
  const bytes = CryptoJS.AES.decrypt(value, token());
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedData;
}

/**
 * Encrypts a string using AES encryption.
 * @param {string} value - The string to encrypt.
 * @returns {string} The encrypted string.
 */
export function encodeString(value: string): string {
  const ciphertext = CryptoJS.AES.encrypt(value, token()).toString();
  return ciphertext;
}

/**
 * Converts a string to its SHA-256 hash value represented as a hexadecimal string.
 * @param {string} inputString The input string to be hashed.
 * @returns {string} The SHA-256 hash of the input string in hexadecimal format.
 */
export function stringToHash(inputString: string): string {
  const hash = CryptoJS.SHA256(inputString);
  return hash.toString(CryptoJS.enc.Hex);
}

/**
 * Formats a Date object into a human-readable date and time string.
 * The string includes the full month name, day, year, hour (in 12-hour format), and minutes.
 * Example output: "May 12, 2024, 02:30 PM"
 * @param {Date} dateTime - The Date object to format.
 * @returns {string} A formatted date and time string in English readable format.
 */
export function readableDateTime(dateTime: Date): string {
  dateTime = new Date(dateTime)
  const formattedDateTime = dateTime.toLocaleString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return formattedDateTime;
}

/**
 * Converts an image URL to an HTMLImageElement asynchronously.
 * @param {string} imageUrl - The URL of the image to load.
 * @returns {Promise<HTMLImageElement>} A promise that resolves with the HTMLImageElement
 * when the image is successfully loaded, or rejects if there is an error.
 */
export function imageUrlToHtmlImageElement(
  imageUrl: string
): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const imgElement = new Image();

    // Specify crossorigin attribute to enable CORS
    imgElement.crossOrigin = "Anonymous"

    imgElement.src = imageUrl || ""

    imgElement.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = imgElement.width;
      canvas.height = imgElement.height;

      if (ctx) {
        ctx.drawImage(imgElement, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        resolve(imageData as unknown as HTMLImageElement)
      }
    }

    imgElement.onerror = (error) => {
      console.error("Error loading image:", error)
      reject(error)
    }
  })
}

export function formatStringForFileName(input: string): string {
  const cleanedString = input.trim().replace(/\s+/g, '  ');
  const formattedString = cleanedString.replace(/\s/g, '-').toLowerCase();
  const timestamp = Date.now();
  return `${formattedString}-${timestamp}`;
}


export async function urlToBase64(url: string): Promise<string> {
  const response = await fetch(url, { mode: 'no-cors' });
  const blob = await response.blob();
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}


const replaceUnsupportedColors = (element: HTMLElement) => {
  const allElements = element.querySelectorAll('*');

  allElements.forEach(el => {
    const htmlEl = el as HTMLElement;
    const style = getComputedStyle(htmlEl);

    const colorProperties = [
      'color',
      'backgroundColor',
      'borderColor',
      'outlineColor',
      'boxShadow',
      'textShadow',
      'backgroundImage',
    ];

    colorProperties.forEach(property => {
      const value = style.getPropertyValue(property);

      // Check for unsupported color functions
      if (value.includes('oklch') || value.includes('lab')) {
        switch (property) {
          case 'color':
          case 'borderColor':
          case 'outlineColor':
          case 'textShadow':
            htmlEl.style.setProperty(property, '#000000');
            break;
          case 'backgroundColor':
            htmlEl.style.setProperty(property, '#ffffff');
            break;
          case 'backgroundImage':
            htmlEl.style.setProperty(property, 'none');
            break;
          case 'boxShadow':
            htmlEl.style.setProperty(property, 'none');
            break;
        }
      }
    });
  });
};

export async function exportFile(value: HTMLElement, name: string): Promise<void> {
  try {
    replaceUnsupportedColors(value);

    const canvas = await html2canvas(value, {
      scale: 1, // Lower scale to reduce memory usage
      useCORS: true,
      logging: true,
      allowTaint: false, // Prefer false for better performance if not using cross-origin resources
      windowWidth: value.scrollWidth,
      windowHeight: value.scrollHeight,
    });

    const imgData = canvas.toDataURL("image/PNG");

    const pdf = new jsPDF({
      orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const imgWidth = pdf.internal.pageSize.getWidth() - 20;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const pageHeight = pdf.internal.pageSize.getHeight();
    let heightLeft = imgHeight;
    let position = 0;

    // Add first page
    pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add subsequent pages
    while (heightLeft > 0) {
      pdf.addPage();
      position -= pageHeight; // Ensure the right position
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    const pdfOutput = pdf.output('arraybuffer');
    const fileName = `${formatStringForFileName(name)}.pdf`;

    await File.writeFile(File.externalRootDirectory + "/Download", fileName, pdfOutput, { replace: true });
    await FileOpener.open(File.externalRootDirectory + "/Download/" + fileName, "application/pdf");

  } catch (error) {
    alert("An error occurred while exporting the PDF: " + error);
    console.error("An error occurred while exporting the PDF:", error);
  }
}

/**
 * Counts the number of words in a given string after cleaning it.
 * The function removes special characters and extra spaces, returning only the word count.
 *
 * @param {string} input - The string to be processed and counted.
 * @returns {number} The number of words in the cleaned string.
 *
 * @example
 * const text = "Hello, World! This is a test string.";
 * console.log(countWords(text)); // Output: 6
 *
 * @example
 * const text = "   Lots of    spaces and special $$$ characters!!!  ";
 * console.log(countWords(text)); // Output: 6
 */
export function countWords(input?: string): number {
  if (!input) return 0
  const cleanedInput = input
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .trim()
    .replace(/\s+/g, ' ');
  const words = cleanedInput.split(' ');
  return words.filter(word => word.length > 0).length;
}

