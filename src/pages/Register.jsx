import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';
import FormInput from '../components/registration/FormInput';
import PageContainer from '../components/common/PageContainer';
import SectionContainer from '../components/common/SectionContainer';
import { validateEmail, validateMobile, validateUsername, validateName } from '../utils/validators';
import registerBanner from '../assets/register-banner.jpg';

const Register = () => {
  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    mobile: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    username: '',
    email: '',
    mobile: '',
    terms: '',
  });

  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {
      name: validateName(formData.name) ? '' : 'Name must contain only letters',
      username: validateUsername(formData.username) ? '' : 'Username must be alphanumeric',
      email: validateEmail(formData.email) ? '' : 'Enter a valid email',
      mobile: validateMobile(formData.mobile) ? '' : 'Mobile must be 10 digits',
      terms: termsAccepted ? '' : 'Check this box if you want to proceed',
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setUser(formData);
      navigate('/categories');
    }
  };

  return (
    <PageContainer className="lg:overflow-hidden">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[1.05fr_1fr]">
        <SectionContainer className="relative min-h-[360px] overflow-hidden bg-cover bg-center lg:min-h-screen" style={{ backgroundImage: `url(${registerBanner})` }}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
          <div className="absolute bottom-10 left-6 max-w-[360px] sm:left-10 lg:bottom-14">
            <p className="text-[28px] font-bold leading-tight text-white sm:text-[34px]">
              Discover new things on Superapp
            </p>
          </div>
        </SectionContainer>

        <SectionContainer className="flex items-center justify-center px-6 py-10 lg:px-12">
          <div className="w-full max-w-[370px]">
            <div className="mb-7 text-center">
              <h1 className="mb-2 text-[30px] font-bold leading-none text-[#72DB73]">Super app</h1>
              <h2 className="text-xs text-white">Create your new account</h2>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <FormInput
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                error={errors.name}
                placeholder="Name"
              />

              <FormInput
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                error={errors.username}
                placeholder="Username"
              />

              <FormInput
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                error={errors.email}
                placeholder="Email"
              />

              <FormInput
                label="Mobile"
                name="mobile"
                type="tel"
                value={formData.mobile}
                onChange={handleInputChange}
                error={errors.mobile}
                placeholder="Mobile"
              />

              <div className="mt-1 flex flex-col gap-1">
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => {
                      setTermsAccepted(e.target.checked);
                      setErrors((prev) => ({ ...prev, terms: '' }));
                    }}
                    className="h-3.5 w-3.5 accent-[#72DB73]"
                  />
                  <span className="text-[11px] text-white/55">Share my registration data with Superapp</span>
                </label>
                {errors.terms && <span className="text-xs text-red-500">{errors.terms}</span>}
              </div>

              <button
                type="submit"
                className="mt-1 h-10 w-full rounded-full bg-[#72DB73] text-sm font-bold text-white transition hover:bg-[#5fd260] active:scale-[0.99]"
              >
                SIGN UP
              </button>

              <div className="mt-1 space-y-3 text-[10px] leading-relaxed text-white/50">
                <p>
                  By clicking on Sign up, you agree to Superapp{' '}
                  <span className="text-[#72DB73]">Terms and Conditions of Use</span>
                </p>
                <p>
                  To learn more about how Superapp collects, uses, shares and protects your personal data please read
                  Superapp <span className="text-[#72DB73]">Privacy Policy</span>
                </p>
              </div>
            </form>
          </div>
        </SectionContainer>
      </div>
    </PageContainer>
  );
};

export default Register;
