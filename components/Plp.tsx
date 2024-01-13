import React from 'react'
import { Configure } from 'react-instantsearch'

const Plp = ({hit}: any) => {
  return (
    <div>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <img
            className="w-24, h-24"
            src={hit.image}
            alt=""
          />
        </a>
        <div className="p-5">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {hit.title}
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
           {hit.actors}
          </p>
        </div>
      </div> 
    </div>
  )
}

export default Plp