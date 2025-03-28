'use client';
import RowSteps from '@/components/ui/stepper';
import UploadFile from './upload-file';
import VerifyData from './verify-data';
import ImportData from './import-data';
import { useBulkUpload } from './context';

export default function BulkUpload() {
  const { formik } = useBulkUpload();

  const stepMap: Record<number, React.ReactNode> = {
    0: <UploadFile />,
    1: <VerifyData />,
    2: <ImportData />
  };

  return (
    <>
      <div className="flex w-full justify-center">
        <RowSteps
          currentStep={formik.values.step}
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
          onStepChange={(step) => {
            if (formik.values.step > step) {
              formik.setFieldValue('step', step);
            }
          }}
        />
      </div>
      {stepMap[formik.values.step]}
    </>
  );
}
