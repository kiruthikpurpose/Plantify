import { useState } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { FaUpload, FaCamera } from 'react-icons/fa'

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_API_KEY)

interface ImageUploadProps {
  setPlantInfo: (info: any) => void
  setUploadedImage: (image: string | null) => void
}

export default function ImageUpload({ setPlantInfo, setUploadedImage }: ImageUploadProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleImage = async (file: File) => {
    setIsLoading(true)
    setUploadedImage(URL.createObjectURL(file))

    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

      const imageParts = [
        {
          inlineData: {
            data: await fileToBase64(file),
            mimeType: file.type,
          },
        },
      ]

      const result = await model.generateContent([
        'Identify this plant and provide the following information in JSON format: name, scientificName, description, family, nativeRegion, growthHabit, flowerColor, leafType. Do not use any markdown formatting in your response, just return the raw JSON.',
        ...imageParts,
      ])

      const response = await result.response
      const text = response.text()
      console.log('API Response:', text)

      try {
        const parsedInfo = JSON.parse(text)
        setPlantInfo(parsedInfo)
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError)
        setPlantInfo({ error: 'Failed to parse plant information. Please try again.' })
      }
    } catch (error) {
      console.error('Error identifying plant:', error)
      setPlantInfo({ error: `Failed to identify plant: ${error.message}` })
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleImage(file)
    }
  }

  const handleCameraCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleImage(file)
    }
  }

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        const base64String = reader.result as string
        const base64WithoutPrefix = base64String.split(',')[1]
        resolve(base64WithoutPrefix)
      }
      reader.onerror = (error) => reject(error)
    })
  }

  return (
    <div className="flex space-x-4 mb-8">
      <div>
        <label
          htmlFor="image-upload"
          className="bg-white text-green-600 px-6 py-3 rounded-lg cursor-pointer hover:bg-green-100 transition-colors text-lg font-semibold flex items-center"
        >
          <FaUpload className="mr-2" />
          {isLoading ? 'Identifying...' : 'Upload Image'}
        </label>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          disabled={isLoading}
        />
      </div>
      <div>
        <label
          htmlFor="camera-capture"
          className="bg-white text-green-600 px-6 py-3 rounded-lg cursor-pointer hover:bg-green-100 transition-colors text-lg font-semibold flex items-center"
        >
          <FaCamera className="mr-2" />
          {isLoading ? 'Capturing...' : 'Take Photo'}
        </label>
        <input
          id="camera-capture"
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleCameraCapture}
          className="hidden"
          disabled={isLoading}
        />
      </div>
    </div>
  )
}