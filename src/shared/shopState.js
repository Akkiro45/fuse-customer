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
    height: '35px'
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
    height: '35px'
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
    height: '35px'
  },
  city: {
    type: 'text',
    placeholder: 'City',
    value: '',
    name: 'city',
    minLength: '1',
    maxLength: '200',
    required: true,
    width: '80%',
    height: '35px'
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
    height: '35px'
  },
  state: {
    type: 'text',
    placeholder: 'State',
    value: '',
    name: 'state',
    minLength: '1',
    maxLength: '200',
    required: true,
    width: '80%',
    height: '35px'
  },
  country: {
    type: 'text',
    placeholder: 'Country',
    value: 'India',
    name: 'country',
    minLength: '1',
    maxLength: '300',
    required: true,
    width: '80%',
    height: '35px'
  },
  category: {
    value: 'Category*',
    name: 'shopCategories',
    type: 3
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
    height: '35px'
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
    height: '35px'
  },
  isStatic: {
    value: 'false',
    name: 'isStatic',
    type: 3
  },
  socialLinks: [],
  linksType: {
    value: 'Twitter',
    name: 'linksType',
    type: 3
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
    height: '35px'
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
    height: '35px'
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