import { Button, Form, Input} from 'antd';
import PhoneInput from "antd-phone-input";
import DoctorService from '../services/DoctorService';


const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};


const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
    phone:'${label} is not a valid phone number!'
  }
};

function getCurrentDate() {
  return new Date();
}

const onFinish = (values: any) => {
  const currentDate = getCurrentDate();
  let modifiedValues = {
    "doctor_id":+values.user.id,
    "username":values.user.username,
    "first_name":values.user["First Name"],
    "last_name":values.user["Last Name"],
    "email":values.user["Email"],
    "specialization":values.user["Specialization"],
    "license_number":+values.user["License number"],
    "phone_number":values.phoneNumber.areaCode + values.phoneNumber.phoneNumber,
    "password":values.password,
    "created_at":currentDate,
    "last_modified_at":currentDate
  }  
  console.log(modifiedValues);

  DoctorService.createDoctor(modifiedValues)
    .then(response => {
      console.log('Doctor added successfully:', response.data);
    })
    .catch(error => {
      console.error('Error adding doctor:', error);
    });
};
  


type FieldType = {
    username?: string;
    password?: string;
  };

const App: React.FC = () => (

  <Form
    {...layout}
    name="nest-messages"
    onFinish={onFinish}
    style={{ maxWidth: 600 }}
    validateMessages={validateMessages}
  >
    <Form.Item
  name={['user', 'id']}
  label="ID"
  rules={[
    {
      required: true,
      validator: async (rule,value) => {
        if (isNaN(value)) {
          throw new Error('ID must be a number');
        }
      },
    },
  ]}
>
  <Input />
</Form.Item>
    <Form.Item name={['user', 'username']} label="Username" rules={[{ required: true }]}>
      <Input />
    </Form.Item>
    <Form.Item name={['user', 'First Name']} label="First name" rules={[{ required: true }]}>
      <Input />
    </Form.Item>
    <Form.Item name={['user', 'Last Name']} label="Last name" rules={[{ required: true }]}>
      <Input />
    </Form.Item>
    <Form.Item name={['user', 'Email']} label="Email" rules={[{ type: 'email' ,required:true}]}>
      <Input />
    </Form.Item>
    <Form.Item
                label="Phone Number"
                name="phoneNumber"
                rules={[{ required: true, 
                    // message: 'Please input your phone number!', 
                    validator: (_, {valid}) => {
                        if (valid()) {
                          return Promise.resolve();
                        }
                        return Promise.reject("Invalid phone number");
                      }
                }]}
            >
                <PhoneInput size='large'
                    enableSearch/>
            </Form.Item>
    <Form.Item name={['user', 'Specialization']} label="Specialization" rules={[{ required: true }]}>
      <Input />
    </Form.Item>
    <Form.Item
  name={['user', 'License number']}
  label="License number"
  rules={[
    {
      required: true,
      validator: async (rule, value) => {
        if (isNaN(value)) {
          throw new Error('License number must be a number');
        }
      },
    },
  ]}
>
  <Input />
</Form.Item>

    <Form.Item<FieldType>
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password />
    </Form.Item>
   
    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
);

export default App;