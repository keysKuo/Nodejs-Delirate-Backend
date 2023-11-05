import { useState, useCallback } from 'react'
import { Pane, FileUploader, FileCard } from 'evergreen-ui'
import { Container, Form } from 'semantic-ui-react'
import { Image, Alert } from 'react-ui';
import logo1 from '../../static/delirate-logo1.png';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8080'

export default function CreateItemScreen() {
    const [files, setFiles] = useState([])
    const [fileRejections, setFileRejections] = useState([])
    const [ isLoading , setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        model: '',
        brand: '',
        origin: '',
        description: '',
    });

    const [ msg, setMsg ] = useState({
        content: '',
        color: ''
    });

    const handleChange = useCallback((files) => setFiles([files[0]]), [])
    const handleRejected = useCallback((fileRejections) => setFileRejections([fileRejections[0]]), [])
    const handleRemove = useCallback(() => {
        setFiles([]);
        setFileRejections([]);
    }, []);

    const clearInput = () => {
        setFormData({
            model: '',
            brand: '',
            origin: '',
            description: '',
        })

        setTimeout(() => {
            setMsg({ content: '', color: ''});
        }, 3000)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formDataToSend = new FormData();
        formDataToSend.append('file', files[0]); // Append the file
        formDataToSend.append('model', formData.model); // Append form data
        formDataToSend.append('brand', formData.brand);
        formDataToSend.append('origin', formData.origin);
        formDataToSend.append('desc', formData.description);
        
        try {
            if (files[0] && formData.model && formData.brand && formData.origin && formData.description) {
                setIsLoading(true);
                const response = await axios.post(apiUrl + '/item/create', formDataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                // console.log(response);
                const result = response.data;
                if(result.success) {
                    setTimeout(() => {
                        clearInput()
                        setIsLoading(false);
                        setMsg({ ...msg, content: result.msg, color: 'lightgreen' });
                    },1000)
                    
                }
                else {
                    setTimeout(() => {
                        setIsLoading(false);
                        setMsg({...msg, content: result.msg, color: '#C94E4E'});
                    },1000)
                }

            }else {
                setMsg({...msg, content: 'Some information still empty', color: '#C94E4E'});
            }
            
            // Handle the response from the server as needed
        } catch (error) {
            console.error('File upload error: ' + error);
        }
    };

    return (
        <Container alignText="left">
            <div className="">
                <Image css={{ width: '300px', margin: '40px 0' }} src={logo1} />
                
                <Form {...(isLoading && { loading: true })}>
                    <Form.Group widths="equal">
                        <Form.Input
                            onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                            value={formData.model}
                            fluid
                            placeholder="Model"
                        />
                    </Form.Group>

                    <Form.Group widths="equal">
                        <Form.Input
                            
                            value={formData.brand}
                            onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                            fluid
                            placeholder="Brand"
                        />
                        <Form.Input
                            value={formData.origin}
                            onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                            fluid
                            placeholder="Origin"
                        />
                    </Form.Group>

                    <Form.TextArea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Description..."
                    />
                    <Pane Width={650}>
                        <FileUploader
                            maxSizeInBytes={50 * 1024 ** 2}
                            maxFiles={1}
                            onChange={handleChange}
                            onRejected={handleRejected}
                            renderFile={(file) => {
                                const { name, size, type } = file;
                                const fileRejection = fileRejections.find(
                                    (fileRejection) => fileRejection.file === file,
                                );
                                const { message } = fileRejection || {};
                                return (
                                    <FileCard
                                        key={name}
                                        isInvalid={fileRejection != null}
                                        name={name}
                                        onRemove={handleRemove}
                                        sizeInBytes={size}
                                        type={type}
                                        validationMessage={message}
                                    />
                                );
                            }}
                            values={files}
                        />
                    </Pane>
                    <Alert css={{ color: `${msg.color}` , border: '0'}} >{msg.content}</Alert>
                    <Form.Button onClick={handleSubmit}>Submit</Form.Button>
                </Form>
            </div>
        </Container>
    );
}

