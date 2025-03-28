'use client';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  Input,
  Select,
  SelectItem,
  ScrollShadow,
  DatePicker,
  ButtonGroup,
  Tooltip
} from '@heroui/react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useFormik } from 'formik';
import { Shipment as ShipmentType } from '@/types/shipment';
import { I18nProvider } from '@react-aria/i18n';
import { parseDate } from '@internationalized/date';
import * as Yup from 'yup';
import { useQueryState } from 'nuqs';
import RowSteps from '@/components/ui/stepper';

const validationSchema = Yup.object({
  mode: Yup.string().required('Please select a mode'),
  mbl: Yup.string().required('Please enter MBL number'),
  carrier: Yup.string().required('Please select a carrier')
});

export default function QuickButtons() {
  const [modal, setModal] = useQueryState('modal');

  const formik = useFormik<ShipmentType>({
    initialValues: {
      mode: 'ocean',
      mbl: '',
      carrier: '1',
      consignee: '',
      dispatchDate: new Date().toISOString().split('T')[0],
      shareWith: '',
      referenceNumber: '',
      pol: '',
      pod: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
    }
  });

  const scrollToFirstError = () => {
    const errorFields = Object.keys(formik.errors);
    if (errorFields.length > 0) {
      const firstErrorField = document.querySelector(
        `[name="${errorFields[0]}"]`
      );
      firstErrorField?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleFormSubmit = () => {
    Object.keys(formik.values).forEach((field) => {
      formik.setFieldTouched(field, true, false);
    });

    formik.validateForm().then((errors) => {
      if (Object.keys(errors).length > 0) {
        scrollToFirstError();
      } else {
        formik.handleSubmit();
      }
    });
  };

  return (
    <>
      <ButtonGroup>
        <Button
          color="primary"
          startContent={<Icon icon="tabler:plus" width={18} />}
          fullWidth
          onPress={() => setModal('add-shipment')}
        >
          Add Shipment
        </Button>
        <Tooltip content="Bulk Upload" color="primary">
          <Button
            color="primary"
            variant="flat"
            isIconOnly
            onPress={() => setModal('bulk-upload')}
          >
            <Icon icon="solar:cloud-upload-bold" width={18} />
          </Button>
        </Tooltip>
      </ButtonGroup>
      <Modal
        isOpen={modal === 'add-shipment'}
        onOpenChange={() =>
          setModal(modal === 'add-shipment' ? null : 'add-shipment')
        }
        backdrop="blur"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex items-center gap-1">
                Add Shipment
              </ModalHeader>
              <ModalBody as={ScrollShadow}>
                <Select
                  label="Mode"
                  name="mode"
                  value={formik.values.mode}
                  onChange={formik.handleChange}
                  selectedKeys={[formik.values.mode]}
                  isInvalid={
                    formik.touched.mode && formik.errors.mode ? true : false
                  }
                  errorMessage={formik.errors.mode}
                  isRequired
                >
                  <SelectItem key="ocean">Ocean</SelectItem>
                  <SelectItem key="air">Air</SelectItem>
                </Select>
                <Input
                  label="MBL/Container Number"
                  name="mbl"
                  value={formik.values.mbl}
                  onChange={formik.handleChange}
                  autoFocus
                  placeholder="eg: MAEU212161424"
                  isInvalid={
                    formik.touched.mbl && formik.errors.mbl ? true : false
                  }
                  errorMessage={formik.errors.mbl}
                  isRequired
                />
                <Select
                  label="Carrier"
                  name="carrier"
                  value={formik.values.carrier}
                  onChange={formik.handleChange}
                  selectedKeys={[formik.values.carrier]}
                  isInvalid={
                    formik.touched.carrier && formik.errors.carrier
                      ? true
                      : false
                  }
                  errorMessage={formik.errors.carrier}
                  isRequired
                >
                  <SelectItem key="1">1</SelectItem>
                  <SelectItem key="2">2</SelectItem>
                  <SelectItem key="3">3</SelectItem>
                </Select>
                <Input
                  label="Consignee"
                  name="consignee"
                  value={formik.values.consignee}
                  onChange={formik.handleChange}
                />
                <I18nProvider locale="en-IN">
                  <DatePicker
                    label="Dispatch Date"
                    name="dispatchDate"
                    value={parseDate(formik.values.dispatchDate)}
                    onChange={(date) => {
                      formik.setFieldValue(
                        'dispatchDate',
                        date?.toString().split('T')[0]
                      );
                    }}
                    showMonthAndYearPickers
                  />
                </I18nProvider>

                <Input
                  label="Share With"
                  name="shareWith"
                  value={formik.values.shareWith}
                  onChange={formik.handleChange}
                />
                <Input
                  label="Reference Number"
                  name="referenceNumber"
                  value={formik.values.referenceNumber}
                  onChange={formik.handleChange}
                />
                <Input
                  label="POL"
                  name="pol"
                  value={formik.values.pol}
                  onChange={formik.handleChange}
                />
                <Input
                  label="POD"
                  name="pod"
                  value={formik.values.pod}
                  onChange={formik.handleChange}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  fullWidth
                  isLoading={formik.isSubmitting}
                  color="primary"
                  onPress={handleFormSubmit}
                >
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal
        isOpen={modal === 'bulk-upload'}
        onOpenChange={() =>
          setModal(modal === 'bulk-upload' ? null : 'bulk-upload')
        }
        backdrop="blur"
        scrollBehavior="inside"
        size="3xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="py-6">
                <div className="flex w-full justify-center">
                  <RowSteps
                    steps={[
                      {
                        title: 'Upload File'
                      },
                      {
                        title: 'Verify Data'
                      },
                      {
                        title: 'Import Data'
                      }
                    ]}
                  />
                </div>

                <label
                  htmlFor="file"
                  className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-foreground p-4"
                >
                  <Button
                    color="primary"
                    size="lg"
                    radius="full"
                    as="label"
                    htmlFor="file"
                    startContent={
                      <Icon icon="solar:cloud-upload-bold" width={18} />
                    }
                  >
                    Upload File
                  </Button>
                  <h4 className="text-lg font-medium text-default-500">
                    or drop a file
                  </h4>
                </label>
                <input id="file" type="file" className="hidden" />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
