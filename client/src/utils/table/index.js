import React from 'react';
import { Badge, Button } from 'reactstrap';

export const formatPrice = (price) => {
  return `£${price}`;
}

export const formatBrand = (brand) => {
  if(brand === '1st Formations') {
    return <Badge color="warning" pill>1st Formations</Badge>;
  }

  if (brand === 'Rapid Formations') {
    return <Badge color="primary" pill>Rapid Formations</Badge>;
  }

  if (brand === 'Quality Company Formations') {
    return <Badge color="info" pill>Quality Company Formations</Badge>;
  }

  if (brand === 'Blue Square Offices') {
    return <Badge color="secondary" pill>Blue Square Offices</Badge>;
  }
  
  return <Badge color="light" pill>None</Badge>;
}

export const formatOrderStatus = (id) => {
  if(id === 0) {
    return <Badge color="secondary" pill>Processing</Badge>;
  }

  if(id === 1) {
    return <Badge color="success" pill>Complete</Badge>;
  }
  
  return <Badge color="danger" pill>Error</Badge>;
}

export function formatActionButton(cell, row, rowIndex, formatExtraData) {
  const { type, history } = formatExtraData;
  const onView = () => {
    history.push(`/${type}/${row.id}`);
  }

  const onDelete = () => {
    alert('lol');
  }

  return (
    <>
      <Button outline color="success" onClick={onView}>View</Button>
      <Button outline color="danger" onClick={onDelete}>Delete</Button>
    </>
  )
}