import {useState} from 'react'

export default function WorkLocations() {
  const [locationInput, setLocationInput] = useState("");
  const [workLocations, setWorkLocations] = useState(["Aba"]);

  return (
    <div className="sm:col-span-2">
      <label className="label" htmlFor="workLocations">
        Locations You Can Work (Multiple)
      </label>
      <div className="input-field px-0! py-0!">
        <input
          type="text"
          value={locationInput}
          onChange={(e) => setLocationInput(e.target.value)}
          required
          className="w-full bg-transparent ml-4 focus:outline-none"
          placeholder="Click 'Add' to add each loaction"
        />
        <button
          className="btn primary-btn w-fit! text-sm!"
          onClick={addLocation}
          type="button"
        >
          Add
        </button>
      </div>
      <div className="mt-2 p-2 border-t border-b border-purple-200 min-h-4 flex items-center gap-2">
        {workLocations.map((i) => (
          <span
            className={
              "bg-purple-400 rounded-sm p-1 flex gap-1 text-white text-xs"
            }
          >
            {i}{" "}
            <button onClick={() => deleteLocation(i)} type="button">
              <MdCancel />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
