import { Modal, ModalBody, ModalContent } from '@heroui/react';
import { useQueryState } from 'nuqs';
import BulkUpload from '../bulk-upload';
import { BulkUploadProvider } from '../bulk-upload/context';

export default function BulkUploadModal() {
  const [modal, setModal] = useQueryState('modal');

  return (
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
              <BulkUploadProvider>
                <BulkUpload />
              </BulkUploadProvider>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
