export const ShopState = {
  shopName: {
    type: 'text',
    placeholder: 'Shop Name',
    value: '',
    name: 'shopName',
    minLength: '1',
    maxLength: '120',
    required: true,
    width: '90%',
    height: '35px',
    bradius: '4px'
  },
  streetAdd: {
    type: 'text',
    placeholder: 'Street Address',
    value: '',
    name: 'streetAdd',
    minLength: '1',
    maxLength: '400',
    required: true,
    width: '90%',
    height: '35px',
    bradius: '4px'
  },
  landmark: {
    type: 'text',
    placeholder: 'Landmark',
    value: '',
    name: 'landmark',
    minLength: '1',
    maxLength: '200',
    required: true,
    width: '90%',
    height: '35px',
    bradius: '4px'
  },
  district: {
    value: 'district*',
    name: 'district',
    type: 3,
    bradius: '4px'
  },
  pincode: {
    type: 'tel',
    placeholder: 'Pincode',
    value: '',
    name: 'pincode',
    minLength: '6',
    maxLength: '6',
    required: true,
    width: '80%',
    height: '35px',
    bradius: '4px'
  },
  state: {
    value: 'state*',
    name: 'state',
    type: 3,
    bradius: '4px'
  },
  category: {
    value: 'Category*',
    name: 'shopCategories',
    type: 3,
    bradius: '4px'
  },
  shopCategories: [],
  phoneNumber: {
    type: 'tel',
    placeholder: 'Contact Number',
    value: '',
    name: 'phoneNumber',
    minLength: '10',
    maxLength: '10',
    required: true,
    width: '90%',
    height: '35px',
    bradius: '4px'
  },
  description: {
    type: 'text',
    placeholder: 'Shop Description',
    value: '',
    name: 'description',
    minLength: '0',
    maxLength: '400',
    required: true,
    width: '90%',
    height: '35px',
    bradius: '4px'
  },
  isStatic: {
    value: 'false',
    name: 'isStatic',
    type: 3,
    bradius: '4px'
  },
  socialLinks: [],
  linksType: {
    value: 'Twitter',
    name: 'linksType',
    type: 3,
    bradius: '4px'
  }, 
  link: {
    type: 'text',
    placeholder: 'AccountName',
    value: '',
    name: 'link',
    minLength: '1',
    maxLength: '50',
    required: true,
    width: '80%',
    height: '35px',
    bradius: '4px'
  },
  deliveryCharge: {
    type: 'tel',
    placeholder: 'Delivery charge if any',
    value: '',
    name: 'deliveryCharge',
    minLength: '0',
    maxLength: '10',
    required: true,
    width: '90%',
    height: '35px',
    bradius: '4px'
  },
  domain: {
    type: 'text',
    placeholder: 'Domain Name',
    value: '',
    name: 'domain',
    minLength: '1',
    maxLength: '120',
    required: true,
    width: '80%',
    height: '35px'
  },
  shopPhoto: null
}