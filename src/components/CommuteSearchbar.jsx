"use client"

import { Autocomplete, TextField, Stack } from "@mui/material"

const CommuteSearchbar = () => {

    const testOptions = [
        {label: 'val1', id: 1},
        {label: 'val2', id: 2},
    ]

  return (
    <Stack spacing={2} width='250px'>
        <Autocomplete color="primary"
        options={testOptions}
        renderInput={(params) => <TextField {...params} label="Option list" />}
        />
    </Stack>
  )
}

export default CommuteSearchbar