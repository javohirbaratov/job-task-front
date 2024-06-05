import { Box, Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { ChangeEvent, useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from "uuid";
import { IFormValues, useAddDocumentMutation } from '../app/services/document';

interface IDocumentFormValues extends IFormValues {
  id: string
}

const DocumentCreate = () => {
  // State 
  const [values, setValues] = useState<IDocumentFormValues[]>([{
    id: uuidv4(),
    field_seq: 0,
    is_mandatory: false,
    field_type: 0,
    field_name: "",
    select_values: ""
  }]);
  const [title, setTitle] = useState<string>("");

  // Api 
  const [addData, { isLoading }] = useAddDocumentMutation();

  // and new values 
  const addValues = useCallback(() => {
    setValues([...values,
    {
      id: uuidv4(),
      field_seq: 0,
      is_mandatory: false,
      field_type: 0,
      field_name: "",
      select_values: ""
    }
    ]);
  }, [values])

  // handle change 
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const parseItem = e.target.name.split(".");
    let value: string | boolean = e.target.checked;

    const data = values.map((item) => {
      if (item.id === parseItem[0]) {
        return {
          ...item,
          [parseItem[1]]: value,
        };
      }
      return item;
    });
    setValues(data);
  }, [values]);

  // handle submit 
  const handleSubmit = useCallback(async () => {
    try {
      const res = await addData({
        document_name: title,
        form_values: values,
      }).unwrap();
      toast.success(res.message);
    } catch (err) {
      if (!err) return;

      if (err instanceof Error) {
        console.error("Error", err.message);
      } else {
        const { data } = err as { data: { message: string } };
        if (data.message) toast.error(data.message);
      }
    }
  }, [addData, title, values])

  return (
    <Box width={"400px"}>
      <TextField
        margin="normal"
        size="small"
        fullWidth
        id="name"
        name="name"
        label="Document title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {
        values.map((item, index) => (
          <Box key={index} borderTop={1} mt={1}>
            <TextField
              margin="normal"
              size="small"
              fullWidth
              id={`${index}.field_seq`}
              name={`${index}.field_seq`}
              label={`Field sequence (weight)`}
              value={item.field_seq}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              size="small"
              fullWidth
              id={`${index}.field_type`}
              name={`${index}.field_type`}
              label="Field type"
              value={item.field_type}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              size="small"
              fullWidth
              id={`${index}.field_name`}
              name={`${index}.field_name`}
              label="Field name"
              value={item.field_name}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              size="small"
              fullWidth
              id={`${index}.select_values`}
              name={`${index}.select_values`}
              label={`Select values`}
              value={item.select_values}
            />
            <FormControlLabel control={
              <Checkbox
                id={`${index}.select_values`}
                name={`${index}.select_values`}
                checked={item.is_mandatory}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            } label="Mandatory" />

          </Box>
        ))
      }
      <Box
        display={"flex"}
        justifyContent={"space-between"}
      >
        <Button
          variant="outlined"
          onClick={addValues}
        >And More</Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
        >
          Save
        </Button>
      </Box>
    </Box>
  )
}

export default DocumentCreate