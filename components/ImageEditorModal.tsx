
import React, { useState } from 'react';
import { editImageWithGemini, fileToBase64 } from '../services/geminiService';
import { SparklesIcon, XIcon } from './Icons';

interface ImageEditorModalProps {
  onClose: () => void;
}

const ImageEditorModal: React.FC<ImageEditorModalProps> = ({ onClose }) => {
  const [prompt, setPrompt] = useState('');
  const [originalImage, setOriginalImage] = useState<{ file: File; url: string } | null>(null);
  const [editedImageUrl, setEditedImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setOriginalImage({ file, url: URL.createObjectURL(file) });
      setEditedImageUrl(null);
      setError(null);
    }
  };

  const handleGenerate = async () => {
    if (!originalImage || !prompt) {
      setError('Please upload an image and enter a prompt.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setEditedImageUrl(null);

    try {
      const base64Data = await fileToBase64(originalImage.file);
      const editedBase64 = await editImageWithGemini(base64Data, originalImage.file.type, prompt);
      setEditedImageUrl(`data:image/png;base64,${editedBase64}`);
    } catch (e: any) {
      setError(e.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <SparklesIcon className="w-6 h-6 text-violet-500" />
            Gemini Image Editor
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <XIcon className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6 flex-grow overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed rounded-2xl bg-slate-50 h-64">
              {originalImage ? (
                <img src={originalImage.url} alt="Original" className="max-h-full max-w-full object-contain rounded-lg" />
              ) : (
                <div className="text-center text-gray-500">
                  <p>Upload an image to start</p>
                  <input type="file" accept="image/*" onChange={handleFileChange} className="mt-4 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-100 file:text-violet-700 hover:file:bg-violet-200"/>
                </div>
              )}
            </div>
            <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed rounded-2xl bg-slate-50 h-64">
              {isLoading ? (
                <div className="flex flex-col items-center gap-2 text-gray-500">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-500"></div>
                  <p>Generating...</p>
                </div>
              ) : editedImageUrl ? (
                <img src={editedImageUrl} alt="Edited" className="max-h-full max-w-full object-contain rounded-lg" />
              ) : (
                <p className="text-center text-gray-500">Your edited image will appear here</p>
              )}
            </div>
          </div>
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </div>

        <div className="p-4 border-t bg-slate-50 rounded-b-3xl">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., 'Add a retro filter' or 'Make it a watercolor painting'"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
              disabled={isLoading}
            />
            <button
              onClick={handleGenerate}
              disabled={isLoading || !originalImage || !prompt}
              className="flex items-center justify-center gap-2 px-6 py-2 bg-violet-600 text-white font-semibold rounded-xl shadow-md hover:bg-violet-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all"
            >
              <SparklesIcon className="w-5 h-5" />
              {isLoading ? 'Generating...' : 'Generate'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageEditorModal;