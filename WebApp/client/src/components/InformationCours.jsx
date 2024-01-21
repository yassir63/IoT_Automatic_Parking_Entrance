import React from 'react'

export default function CoursInfo ({ data }){
    return (
      <div className="flex flex-col bg-gray-100 p-4 rounded-lg shadow-md w-full m-auto">
        <h2 className="text-lg font-semibold mb-2">Course Information</h2>
        <div className="flex items-center mb-2">
          <span className="text-gray-600 mr-2">ID:</span>
          <span className="text-gray-800">{data.id}</span>
        </div>
        <div className="flex items-center mb-2">
          <span className="text-gray-600 mr-2">Name:</span>
          <span className="text-gray-800">{data.nom}</span>
        </div>
        <div className="flex items-center mb-2">
          <span className="text-gray-600 mr-2">Description:</span>
          <p className="text-gray-800 truncate">{data.description}</p>
        </div>
        <div className="flex items-center mb-2">
          <span className="text-gray-600 mr-2">Difficulty:</span>
          <span className="text-green-600">{data.difficulte}</span>
        </div>
        <div className="flex items-center mb-2">
          <span className="text-gray-600 mr-2">Beneficiaries:</span>
          <span className="text-gray-800">{data.nbrBeneficiaires}</span>
        </div>
        <div className="flex items-center mb-2">
          <span className="text-gray-600 mr-2">Chapters:</span>
          <span className="text-gray-800">{data.nbrChapitres}</span>
        </div>
        <div className="flex items-center mb-2">
          <span className="text-gray-600 mr-2">Groups:</span>
          <span className="text-gray-800">{data.nbrGroupes}</span>
        </div>
        <div className="flex items-center mb-2">
          <span className="text-gray-600 mr-2">Created At:</span>
          <span className="text-gray-800">{data.createdAt}</span>
        </div>
        <div className="flex items-center">
          <span className="text-gray-600 mr-2">Created By:</span>
          <span className="text-gray-800">{data.createdBy}</span>
        </div>
      </div>
    );
  };
