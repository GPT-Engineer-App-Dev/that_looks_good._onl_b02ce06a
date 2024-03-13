import React, { useState } from "react";
import { Box, Button, Container, FormControl, FormLabel, Input, VStack, Text, useToast, Heading, Textarea, Radio, RadioGroup, Stack, Checkbox } from "@chakra-ui/react";
import { FaPrint } from "react-icons/fa";

const Index = () => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    email: "",
    sampleInfo: "",
    name: "",
    company: "",
    address: "",
    phone: "",
    shippingAddress: "",
    sendPicture: false,
    materialSpecs: "",
  });
  const [uniqueNumber, setUniqueNumber] = useState(null);
  const [trackingNumber, setTrackingNumber] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const generateUniqueNumber = () => {
    return Math.floor(100000 + Math.random() * 900000);
  };

  const generateTrackingNumber = () => {
    return "CYK" + Date.now().toString().slice(-8);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const uniqueNum = generateUniqueNumber();
    const trackNum = generateTrackingNumber();
    setUniqueNumber(uniqueNum);
    setTrackingNumber(trackNum);

    // TODO: Email automation to send form data, unique number, and tracking number
    toast({
      title: "Form Submitted.",
      description: `Your unique number is ${uniqueNum} and your tracking number is ${trackNum}.`,
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  const printLabel = () => {
    // TODO: Implement label printing functionality
    alert(`Print Shipping Label:\nCyklop CSC Att.: SampleLab M.Slot [${uniqueNumber}] Wilhelm Röntgenstraat 10, 8013NC, Zwolle, Nederland\nTracking Number: ${trackingNumber}`);
  };

  return (
    <Box bg="#002F5D" minH="100vh" py={10}>
      <Container maxW="container.md">
        <VStack spacing={5}>
          <Heading as="h1" size="xl" color="white">
            Shipment Tracking and Sample Request
          </Heading>
          <FormControl id="name" isRequired>
            <FormLabel color="white">Name</FormLabel>
            <Input name="name" type="text" value={formData.name} onChange={handleInputChange} placeholder="Enter your name" color="white" />
          </FormControl>
          <FormControl id="company">
            <FormLabel color="white">Company</FormLabel>
            <Input name="company" type="text" value={formData.company} onChange={handleInputChange} placeholder="Enter your company" color="white" />
          </FormControl>
          <FormControl id="address">
            <FormLabel color="white">Address</FormLabel>
            <Input name="address" type="text" value={formData.address} onChange={handleInputChange} placeholder="Enter your address" color="white" />
          </FormControl>
          <FormControl id="phone">
            <FormLabel color="white">Phone</FormLabel>
            <Input name="phone" type="tel" value={formData.phone} onChange={handleInputChange} placeholder="Enter your phone number" color="white" />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel color="white">Email Address</FormLabel>
            <Input name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="Enter your email" color="white" />
          </FormControl>
          <FormControl id="shippingAddress">
            <FormLabel color="white">Return Shipping Address</FormLabel>
            <Textarea name="shippingAddress" value={formData.shippingAddress} onChange={handleInputChange} placeholder="Enter return shipping address" color="white" />
          </FormControl>
          <FormControl id="sendPicture">
            <FormLabel color="white">Is sending a picture of the sample sufficient?</FormLabel>
            <RadioGroup name="sendPicture" onChange={(value) => setFormData({ ...formData, sendPicture: value === "yes" })}>
              <Stack direction="row">
                <Radio value="yes" color="white">
                  Yes
                </Radio>
                <Radio value="no" color="white">
                  No
                </Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
          <FormControl id="materialSpecs">
            <FormLabel color="white">Material Type and Specifications</FormLabel>
            <Textarea name="materialSpecs" value={formData.materialSpecs} onChange={handleInputChange} placeholder="Describe the material and specifications" color="white" />
          </FormControl>
          <FormControl id="sampleInfo" isRequired>
            <FormLabel color="white">Desired Sample Size</FormLabel>
            <Input name="sampleSize" value={formData.sampleSize} onChange={handleInputChange} placeholder="Enter desired sample size" color="white" />
          </FormControl>
          <FormControl>
            <FormLabel color="white">Sample Location Image</FormLabel>
            <Input type="file" accept="image/*" color="white" />
          </FormControl>
          <FormControl>
            <FormLabel color="white">Logo/Design Files</FormLabel>
            <Input type="file" accept=".pdf,.png,.jpg,.jpeg,.bmp,.ai,.plt,.svg" multiple color="white" />
          </FormControl>
          <FormControl id="sampleInfo">
            <FormLabel color="white">Sample Information</FormLabel>
            <Textarea name="sampleInfo" value={formData.sampleInfo} onChange={handleInputChange} placeholder="Additional sample information" color="white" />
          </FormControl>
          <Button colorScheme="green" bg="#6CB42C" color="white" leftIcon={<FaPrint />} onClick={handleSubmit} isDisabled={trackingNumber != null}>
            Submit Request
          </Button>
          {trackingNumber && (
            <Button colorScheme="green" bg="#6CB42C" color="white" leftIcon={<FaPrint />} onClick={printLabel}>
              Print Shipping Label
            </Button>
          )}
        </VStack>
      </Container>
    </Box>
  );
};

export default Index;
