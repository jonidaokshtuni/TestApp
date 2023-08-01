import React from "react"
import { useNavigate } from "react-router-dom";

import { useForm, Controller } from 'react-hook-form';

const colors = ['red', 'green', 'blue', 'white', 'black'];

const MyForm = () => {
    const navigate= useNavigate()
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm();

    
    const onSubmit = async (data) => {
        try {
          // Fetch the existing data from data.json
          const response = await fetch('/data.json');
          console.log('ss0', response)
          const existingData = await response.json();
    
          // Add the new data to the array
          const newData = [...existingData, data];

          localStorage.setItem('formData', JSON.stringify(newData));

          // Reset the form after submission
        //   setFormData({
        //     name: '',
        //     surname: '',
        //     email: '',
        //     age: '',
        //     favoriteColor: '',
        //     contactPreference: [],
        //   });
          const directoryHandle = await window.showDirectoryPicker();
          const fileHandle = await directoryHandle.getFileHandle('data.json', { create: true });
          const file = await fileHandle.createWritable();
          await file.write(JSON.stringify(newData, null, 2));
          await file.close();
       
          // Update the data.json file with the new data
     
    
          // Reset the form after successful submission
          reset();
          navigate('/')
        } catch (error) {
          console.error('Error saving data:', error);
        }
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
            max:{value: 120, message: 'Age must be less than 120'}
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
        <Controller
          name="contactPreference"
          control={control}
          rules={{ required: 'Contact preference is required' }}
          render={({ field }) => (
            <div>
              <label>
                <input type="checkbox" value="email" {...field} />
                Email
              </label>
              <label>
                <input type="checkbox" value="phoneCall" {...field} />
                Phone Call
              </label>
              <label>
                <input type="checkbox" value="viaSMS" {...field} />
                Via SMS
              </label>
            </div>
          )}
        />
        {errors.contactPreference && <span>{errors.contactPreference.message}</span>}
      </div>

      <button type="submit">Submit</button>
    </form>
    )
}

export default MyForm