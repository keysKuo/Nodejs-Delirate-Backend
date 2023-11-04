import { useState, useCallback } from 'react'
import { Pane, FileUploader, FileCard } from 'evergreen-ui'
import { Container, Form } from 'semantic-ui-react'

export default function CreateItemScreen() {
  const [files, setFiles] = useState([])
  const [fileRejections, setFileRejections] = useState([])
  const handleChange = useCallback((files) => setFiles([files[0]]), [])
  const handleRejected = useCallback((fileRejections) => setFileRejections([fileRejections[0]]), [])
  const handleRemove = useCallback(() => {
    setFiles([])
    setFileRejections([])
  }, [])




    return (
        <Container alignText="left">
            <div className="">
                <Form>
                    <Form.Group widths="equal">
                        <Form.Input fluid placeholder="Model" />
                        
                    </Form.Group>

                    <Form.Group widths="equal">
                        <Form.Input fluid placeholder="Brand" />
                        <Form.Input fluid placeholder="Origin" />
                    </Form.Group>

                    <Form.TextArea placeholder="Description..." />
                    <Pane minWidth={650}>
                    <FileUploader
                        maxSizeInBytes={50 * 1024 ** 2}
                        maxFiles={1}
                        onChange={handleChange}
                        onRejected={handleRejected}
                        renderFile={(file) => {
                            const { name, size, type } = file;
                            const fileRejection = fileRejections.find((fileRejection) => fileRejection.file === file);
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
                    <Form.Button>Submit</Form.Button>
                </Form>
            </div>
        </Container>
    );
}

