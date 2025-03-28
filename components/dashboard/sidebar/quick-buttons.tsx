'use client';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ButtonGroup,
  Tooltip
} from '@heroui/react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useQueryState } from 'nuqs';
import RowSteps from '@/components/ui/stepper';
import AddShipment from '../modals/add-shipment';
import BulkUpload from '../modals/bulk-upload';

export default function QuickButtons() {
  const [modal, setModal] = useQueryState('modal');

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

      <AddShipment />
      <BulkUpload />
    </>
  );
}
