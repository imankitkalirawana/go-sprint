'use client';

import { addToast } from '@heroui/react';
import { useFormik } from 'formik';
import { createContext, useContext, useState } from 'react';

interface FormType {
  step: number;
  file: File | null;
  status: 'idle' | 'uploading' | 'verifying' | 'importing';
}

interface BulkUploadContextType {
  formik: ReturnType<typeof useFormik<FormType>>;
}

const BulkUploadContext = createContext<BulkUploadContextType | undefined>(
  undefined
);

export const BulkUploadProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const formik = useFormik<FormType>({
    initialValues: {
      step: 0,
      file: null,
      status: 'idle'
    },
    onSubmit: async (values) => {
      if (!values.file) {
        formik.setErrors({
          file: 'File is required'
        });
        return;
      }

      if (values.step === 0 || values.step === 1) {
        formik.setFieldValue('status', 'uploading');
        // TODO: Upload file to server
        await new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(true);
            // reject(new Error('Random upload failure'));
          }, 1000);
        })
          .then(async () => {
            formik.setFieldValue('status', 'verifying');
            formik.setFieldValue('step', 1);
            // TODO: Verify data
            await new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve(true);
                // reject(new Error('Random verify failure'));
              }, 1000);
            })
              .then(() => {
                formik.setFieldValue('status', 'idle');
                formik.setFieldValue('step', 2);
              })
              .catch((error) => {
                console.error(error);
                formik.setFieldError('file', error.message);
                return;
              });
          })
          .catch((error) => {
            formik.setFieldError('file', error.message);
            console.error(error);
          });
      }
    }
  });

  console.log(formik.errors.file);

  return (
    <BulkUploadContext.Provider value={{ formik }}>
      {children}
    </BulkUploadContext.Provider>
  );
};

export const useBulkUpload = () => {
  const context = useContext(BulkUploadContext);
  if (!context) {
    throw new Error('useBulkUpload must be used within a BulkUploadProvider');
  }
  return context;
};
