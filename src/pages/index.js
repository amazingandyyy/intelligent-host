import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import html2canvas from 'html2canvas';
import { useRouter } from 'next/router';
import cheerio from 'cheerio'

const Landing = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [screenshot, setScreenshot] = useState(null);
  const router = useRouter();

  const onDragEnter = useCallback(() => {
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length === 1) {
      const file = acceptedFiles[0];
      const reader = new FileReader();

      reader.onload = async () => {
        // Render the HTML content in a temporary div
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = reader.result;
        document.body.appendChild(tempDiv);

        const $ = cheerio.load(reader.result)
        const content = $('#__NEXT_DATA__').html()
        const json = JSON.parse(content)
        const parsedData = json.props.pageProps.data
        console.log(3)
        // Wait for the JavaScript to execute (if any)
        // await new Promise(resolve => {
        //   if (tempDiv.querySelector('script')) {
        //     // If there is JavaScript, wait for window.onload
        //     window.onload = resolve;
        //   } else {
        //     // If no JavaScript, resolve immediately
        //     resolve();
        //   }
        // });
        console.log(1)
        // Take a screenshot of the rendered HTML
        await html2canvas(tempDiv, { windowWidth: tempDiv.scrollWidth, windowHeight: tempDiv.scrollHeight }).then((canvas) => {
          // Convert the canvas to a data URL
          const dataUrl = canvas.toDataURL('image/png');
          console.log(2)
          // Set the screenshot state to display the image on the page
          setScreenshot(dataUrl);

          // save dataUrl to local storage
          localStorage.setItem('turoInsightsImageUrl', dataUrl);
          localStorage.setItem('turoInsightsData', JSON.stringify(parsedData));

          // Navigate to the Insights page
          router.push('insights');
        });

        // Remove the temporary div
        document.body.removeChild(tempDiv);
      };

      // Read the file as text
      reader.readAsText(file);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDragEnter,
    onDragLeave,
    onDrop,
    accept: 'text/html',
    multiple: false,
  });


  return (
    <div className="min-h-screen flex items-center justify-center">
      <div
        {...getRootProps()}
        className={`bg-${isDragging ? '#593CFB' : 'gray-200'} p-24 rounded-md border-2 cursor-pointer transition-all hover:bg-[#593CFB] hover:text-white`}
      >
        <div className='text-2xl font-bold mb-2 text-center'>Gain Insights of your Turo Car profile</div>
        <input {...getInputProps()} />
        <p className="text-center">
          Drag and drop an HTML file here, or click to select a file
        </p>
        {/* {screenshot && (
          <div className="mt-4">
            <img src={screenshot} alt="Screenshot" className="max-w-full h-auto" />
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Landing;
