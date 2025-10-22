import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import {Platform} from 'react-native';

interface AttendanceGoalData {
  Event?: Array<{
    _id: string;
    name: string;
    type: string;
    percentage: number;
    daysLeft: number;
    endDate: string;
    createdAt: string;
    updatedAt: string;
    user: string;
    __v: number;
  }>;
  'Training Goal'?: {
    [month: string]: number;
  };
}

export const generateAttendanceGoalsPDF = async (
  data: AttendanceGoalData,
  userName: string = 'User',
): Promise<string> => {
  try {
    // Create HTML content for the PDF
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Attendance Goals Report</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
              color: #333;
            }
            .header {
              text-align: center;
              border-bottom: 2px solid #007AFF;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            .header h1 {
              color: #007AFF;
              margin: 0;
              font-size: 24px;
            }
            .header p {
              color: #666;
              margin: 5px 0;
            }
            .section {
              margin-bottom: 30px;
            }
            .section h2 {
              color: #007AFF;
              border-bottom: 1px solid #ddd;
              padding-bottom: 10px;
            }
            .event-card {
              background: #f8f9fa;
              border: 1px solid #ddd;
              border-radius: 8px;
              padding: 15px;
              margin-bottom: 15px;
            }
            .event-name {
              font-weight: bold;
              font-size: 16px;
              margin-bottom: 8px;
            }
            .event-details {
              display: flex;
              justify-content: space-between;
              margin-bottom: 10px;
            }
            .progress-bar {
              background: #e9ecef;
              border-radius: 10px;
              height: 20px;
              overflow: hidden;
              margin-bottom: 10px;
            }
            .progress-fill {
              background: #007AFF;
              height: 100%;
              transition: width 0.3s ease;
            }
            .training-goals {
              display: flex;
              flex-wrap: wrap;
              gap: 15px;
            }
            .month-card {
              background: #f8f9fa;
              border: 1px solid #ddd;
              border-radius: 8px;
              padding: 15px;
              text-align: center;
              min-width: 120px;
            }
            .month-name {
              font-weight: bold;
              color: #007AFF;
              margin-bottom: 5px;
            }
            .month-percentage {
              font-size: 24px;
              font-weight: bold;
              color: #28a745;
            }
            .no-data {
              text-align: center;
              color: #666;
              font-style: italic;
              padding: 20px;
            }
            .footer {
              margin-top: 40px;
              text-align: center;
              color: #666;
              font-size: 12px;
              border-top: 1px solid #ddd;
              padding-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Attendance Goals Report</h1>
            <p>Generated for: ${userName}</p>
            <p>Date: ${new Date().toLocaleDateString()}</p>
          </div>

          <div class="section">
            <h2>Events & Goals</h2>
            ${
              data.Event && data.Event.length > 0
                ? data.Event.map(
                    event => `
                <div class="event-card">
                  <div class="event-name">${event.name}</div>
                  <div class="event-details">
                    <span><strong>Type:</strong> ${event.type}</span>
                    <span><strong>Days Left:</strong> ${event.daysLeft}</span>
                  </div>
                  <div class="progress-bar">
                    <div class="progress-fill" style="width: ${event.percentage}%"></div>
                  </div>
                  <div style="text-align: center; font-weight: bold; color: #007AFF;">
                    ${event.percentage}% Complete
                  </div>
                </div>
              `,
                  ).join('')
                : '<div class="no-data">No events found</div>'
            }
          </div>

          <div class="section">
            <h2>Training Goals Progress</h2>
            ${
              data['Training Goal'] &&
              Object.keys(data['Training Goal']).length > 0
                ? `<div class="training-goals">
                  ${Object.entries(data['Training Goal'])
                    .map(
                      ([month, percentage]) => `
                    <div class="month-card">
                      <div class="month-name">${month}</div>
                      <div class="month-percentage">${percentage}%</div>
                    </div>
                  `,
                    )
                    .join('')}
                </div>`
                : '<div class="no-data">No training goals data available</div>'
            }
          </div>

          <div class="footer">
            <p>Generated by Prymo Sports App</p>
            <p>Report generated on ${new Date().toLocaleString()}</p>
          </div>
        </body>
      </html>
    `;

    // Generate PDF
    const options = {
      html: htmlContent,
      fileName: `AttendanceGoals_${userName}_${
        new Date().toISOString().split('T')[0]
      }`,
      directory: Platform.OS === 'ios' ? 'Documents' : 'Downloads',
    };

    const file = await RNHTMLtoPDF.convert(options);

    if (file.filePath) {
      // For Android, ensure we have the correct file path
      if (Platform.OS === 'android') {
        // Check if the file exists and get the absolute path
        const fileExists = await RNFS.exists(file.filePath);
        if (!fileExists) {
          throw new Error('Generated PDF file not found');
        }
      }
      return file.filePath;
    } else {
      throw new Error('Failed to generate PDF');
    }
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};

export const sharePDF = async (filePath: string): Promise<void> => {
  try {
    // Ensure the file exists
    const fileExists = await RNFS.exists(filePath);
    if (!fileExists) {
      throw new Error('PDF file not found');
    }

    // For Android, we need to ensure the file URI is properly formatted
    let fileUrl = filePath;
    if (Platform.OS === 'android') {
      // Check if the path already has the file:// prefix
      if (!filePath.startsWith('file://')) {
        fileUrl = `file://${filePath}`;
      }
      // For Android, we might need to use content:// URI instead
      // This is a fallback approach
      try {
        const shareOptions = {
          title: 'Share Attendance Goals Report',
          url: fileUrl,
          type: 'application/pdf',
          showAppsToView: true,
        };
        await Share.open(shareOptions);
      } catch (shareError) {
        // Alternative approach for Android
        const alternativeShareOptions = {
          title: 'Share Attendance Goals Report',
          url: filePath, // Try without file:// prefix
          type: 'application/pdf',
          showAppsToView: true,
        };
        await Share.open(alternativeShareOptions);
      }
    } else {
      // iOS sharing
      const shareOptions = {
        title: 'Share Attendance Goals Report',
        url: filePath,
        type: 'application/pdf',
        showAppsToView: true,
      };
      await Share.open(shareOptions);
    }
  } catch (error) {
    console.error('Error sharing PDF:', error);
    throw error;
  }
};

export const downloadPDF = async (filePath: string): Promise<void> => {
  try {
    if (Platform.OS === 'ios') {
      // For iOS, we can use the share functionality to save to Files app
      await sharePDF(filePath);
    } else {
      // For Android, we can copy to Downloads folder
      const downloadsPath = RNFS.DownloadDirectoryPath;
      const fileName = filePath.split('/').pop() || 'attendance_goals.pdf';
      const destinationPath = `${downloadsPath}/${fileName}`;

      await RNFS.copyFile(filePath, destinationPath);

      // Open the PDF after downloading
      await openPDF(destinationPath);
    }
  } catch (error) {
    console.error('Error downloading PDF:', error);
    throw error;
  }
};

export const openPDF = async (filePath: string): Promise<void> => {
  try {
    // Ensure the file exists
    const fileExists = await RNFS.exists(filePath);
    if (!fileExists) {
      throw new Error('PDF file not found');
    }

    // For Android, we need to ensure the file URI is properly formatted
    let fileUrl = filePath;
    if (Platform.OS === 'android') {
      // Check if the path already has the file:// prefix
      if (!filePath.startsWith('file://')) {
        fileUrl = `file://${filePath}`;
      }
      // For Android, we might need to use content:// URI instead
      // This is a fallback approach
      try {
        const shareOptions = {
          title: 'Open PDF',
          url: fileUrl,
          type: 'application/pdf',
          showAppsToView: true,
        };
        await Share.open(shareOptions);
      } catch (shareError) {
        // Alternative approach for Android
        const alternativeShareOptions = {
          title: 'Open PDF',
          url: filePath, // Try without file:// prefix
          type: 'application/pdf',
          showAppsToView: true,
        };
        await Share.open(alternativeShareOptions);
      }
    } else {
      // iOS opening
      const shareOptions = {
        title: 'Open PDF',
        url: filePath,
        type: 'application/pdf',
        showAppsToView: true,
      };
      await Share.open(shareOptions);
    }
  } catch (error) {
    console.error('Error opening PDF:', error);
    throw error;
  }
};
