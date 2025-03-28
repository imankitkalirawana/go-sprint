import { Button, Link, Spinner } from '@heroui/react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useBulkUpload } from './context';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function UploadFile({
  type = 'upload'
}: {
  type?: 'upload' | 'verify';
}) {
  const { formik } = useBulkUpload();

  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    formik.setFieldValue('file', e.dataTransfer.files[0]);
    setIsDragging(false);
    formik.submitForm();
  };

  return (
    <div className="relative">
      {formik.isSubmitting ? (
        <>
          <div className="flex h-full min-h-44 w-full items-center justify-center">
            <Spinner
              label={`
                ${
                  formik.values.status.charAt(0).toUpperCase() +
                  formik.values.status.slice(1)
                }...
              `}
            />
          </div>
        </>
      ) : (
        <>
          <label
            htmlFor="file"
            className="relative flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-default-300 p-4 py-10 transition-all hover:border-primary"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={() => setIsDragging(true)}
            onDragLeave={() => setIsDragging(false)}
          >
            <div
              className={cn(
                'absolute z-50 flex h-full w-full items-center justify-center rounded-xl bg-background/50 backdrop-blur-xl transition-all',
                isDragging ? 'opacity-100' : 'opacity-0'
              )}
            >
              <h3 className="text-2xl font-medium text-primary">
                Drop it like it&apos;s hot
              </h3>
              <div className="absolute left-2 top-2">
                <span className="block h-2.5 w-10 rounded-full rounded-bl-none bg-primary" />
                <span className="block h-8 w-2.5 rounded-b-lg bg-primary" />
              </div>
              <div className="absolute right-2 top-2 flex flex-col items-end">
                <span className="block h-2.5 w-10 rounded-full rounded-br-none bg-primary" />
                <span className="block h-8 w-2.5 rounded-b-lg bg-primary" />
              </div>
              <div className="absolute bottom-2 left-2 flex flex-col items-start">
                <span className="block h-8 w-2.5 rounded-t-lg bg-primary" />
                <span className="block h-2.5 w-10 rounded-full rounded-tl-none bg-primary" />
              </div>
              <div className="absolute bottom-2 right-2 flex flex-col items-end">
                <span className="block h-8 w-2.5 rounded-t-lg bg-primary" />
                <span className="block h-2.5 w-10 rounded-full rounded-tr-none bg-primary" />
              </div>
            </div>
            <Button
              color="primary"
              variant="shadow"
              size="lg"
              radius="full"
              startContent={<Icon icon="solar:cloud-upload-bold" width={18} />}
              onPress={() => formik.setFieldValue('step', 1)}
            >
              {type === 'upload' ? 'Upload File' : 'Re-upload File'}
            </Button>
            <h4 className="text-lg font-medium text-default-500">
              or drop a file here
            </h4>
          </label>
          {formik.errors.file && (
            <div className="mt-1 flex items-center justify-center gap-1 text-center text-sm text-danger-500">
              <Icon icon="solar:info-circle-bold" width={14} />
              <span>{formik.errors.file}</span>
              <Link
                className="cursor-pointer hover:underline"
                size="sm"
                color="primary"
                onPress={() => formik.handleSubmit()}
              >
                Try again
              </Link>
            </div>
          )}
        </>
      )}
      <input
        id="file"
        type="file"
        className="hidden"
        onChange={(e) => {
          formik.setFieldValue('file', e.target.files?.[0]);
          formik.submitForm();
        }}
      />
    </div>
  );
}
