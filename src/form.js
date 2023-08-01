import React from "react"
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { useForm, Controller, register } from 'react-hook-form';

const colors = ['red', 'green', 'blue', 'white', 'black'];

const MyForm = ({ data, setData }) => {
  console.log('ddd', data)
  const navigate = useNavigate()
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const options = [
    { id: 'byEmail', label: 'by email' },
    { id: 'byPhoneCall', label: 'by phone call' },
    { id: 'viaSms', label: 'via SMS' },
  ];
  const onSubmit = (dataAdd) => {
    // Add the new data to the array
    const trueKeysArray = Object.keys(dataAdd?.options).filter((key) => dataAdd?.options[key] === true);
    //console.log('vvv',trueKeysArray)
    // dataAdd.push(trueKeysArray)
    const uniqueId = uuidv4()
    //new Date().getTime();
    dataAdd['contactPreference'] = trueKeysArray;
    dataAdd['id']= uniqueId
    const newData = [...data, dataAdd];
    // localStorage.setItem('formData', JSON.stringify(newData));
    setData(newData)
    reset();
    navigate('/')
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name:</label>
        <Controller
          name="name"
          control={control}
          rules={{ required: 'Name is required' }}
          render={({ field }) => <input {...field} />}
        />
        {errors.name && <span>{errors.name.message}</span>}
      </div>

      <div>
        <label>Surname:</label>
        <Controller
          name="surname"
          control={control}
          rules={{ required: 'Surname is required' }}
          render={({ field }) => <input {...field} />}
        />
        {errors.surname && <span>{errors.surname.message}</span>}
      </div>

      <div>
        <label>Email:</label>
        <Controller
          name="email"
          control={control}
          rules={{ required: 'Email is required', pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }}
          render={({ field }) => <input {...field} />}
        />
        {errors.email && <span>{errors.email.message}</span>}
      </div>

      <div>
        <label>Age:</label>
        <Controller
          name="age"
          control={control}
          rules={{
            required: 'Age is required',
            min: { value: 0, message: 'Age must be a positive number' },
            max: { value: 120, message: 'Age must be less than 120' }
          }}
          render={({ field }) => <input type="number" {...field} />}
        />
        {errors.age && <span>{errors.age.message}</span>}
      </div>

      <div>
        <label>Favorite color:</label>
        <Controller
          name="favoriteColor"
          control={control}
          rules={{ required: 'Favorite color is required' }}
          render={({ field }) => (
            <select {...field}>
              <option value="">Select a color</option>
              {colors.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
          )}
        />
        {errors.favoriteColor && <span>{errors.favoriteColor.message}</span>}
      </div>

      <div>
        <label>Contact preference:</label>
        {options.map((option) => (
        <div key={option.id}>
          <Controller
           name={`options[${option.id}]`}
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <label>
                <input
                  type="checkbox"
                  {...field}
                  value={option.id}
                  checked={field.value}
                />
                {option.label}
              </label>
            )}
          />
        </div>
      ))}
        {errors.contactPreference && <span>{errors.contactPreference.message}</span>}
      </div>

      <button type="submit">Submit</button>
    </form>
  )
}

export default MyForm