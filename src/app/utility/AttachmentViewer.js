import React from "react";
import { Button, Modal } from "react-bootstrap";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";

export const AttachmentViewer = ({ show, handleClose, data }) => {
  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Viewer Doc </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <DocViewer pluginRenderers={DocViewerRenderers} documents={data} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
