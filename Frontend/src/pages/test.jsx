import React, { useState } from 'react';
import axios from 'axios';
import AxiosClient from '../axios/api';
import { Form, Formik } from 'formik';

const FileUpload = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (values) => {
        // event.preventDefault();
        
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await AxiosClient.post('/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Formik initialValues={{ file: null }} onSubmit={handleSubmit}>
        <Form>
            <label htmlFor="file">click file</label>
            <input type="file" id="file" name="file" className='hidden' onChange={handleFileChange} />
            <button type="submit">Upload</button>
        </Form>
        </Formik>
    );
};

export default FileUpload;
