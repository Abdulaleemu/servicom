'use client'
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

function QrCodeDownload({id}) {
  const [downloadUrl, setDownloadUrl] = useState(null);

  useEffect(() => {
    // Fetch the QR code image
    fetch(`${process.env.NEXT_BASEURL}QrCode/quickchart?AgencyId=${id}&imageWidth=500`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.blob();
      })
      .then((blob) => {
        // Create a Blob URL for the response
        const url = URL.createObjectURL(blob);
        setDownloadUrl(url);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, );

  const handleDownloadClick = () => {
    if (downloadUrl) {
      // Create a temporary anchor element
      const a = document.createElement('a');
      a.href = downloadUrl;

      // Check for the Content-Disposition header in response headers
      const contentDisposition = xhr.getResponseHeader('content-disposition');
      if (contentDisposition) {
        const matches = contentDisposition.match(/filename=([^;]+)/);
        if (matches && matches.length >= 2) {
          const filename = matches[1];
          a.download = filename;
        }
      } else {
        // If there's no Content-Disposition header, use a default filename
        a.download = 'qrcode.png';
      }

      // Trigger the download
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div>
      {downloadUrl ? (
        <div>
          <Image src={downloadUrl} alt="QR Code" height={300} width={300} />
          <button onClick={handleDownloadClick}>Download QR Code</button>
        </div>
      ) : (
        <p>Loading QR Code...</p>
      )}
    </div>
  );
}

export default QrCodeDownload;
