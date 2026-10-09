import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Badge from '@/components/common/Badge.vue';
import AddAssetModal from '@/components/assets/AddAssetModal.vue';

describe('Badge Component', () => {
  it('renders default emerald variant', () => {
    const wrapper = mount(Badge, {
      slots: {
        default: 'Active Warranty',
      },
    });
    expect(wrapper.text()).toContain('Active Warranty');
    expect(wrapper.classes()).toContain('bg-brand-sage');
  });

  it('renders warning and danger variants', () => {
    const warning = mount(Badge, {
      props: { variant: 'warning' },
      slots: { default: 'Due Soon' },
    });
    expect(warning.classes()).toContain('bg-amber-100');

    const danger = mount(Badge, {
      props: { variant: 'danger' },
      slots: { default: 'Overdue' },
    });
    expect(danger.classes()).toContain('bg-red-50');
  });
});

describe('AddAssetModal Component', () => {
  it('does not render content when isOpen is false', () => {
    const wrapper = mount(AddAssetModal, {
      props: { isOpen: false },
    });
    expect(wrapper.find('form').exists()).toBe(false);
  });

  it('renders modal form when isOpen is true', () => {
    const wrapper = mount(AddAssetModal, {
      props: { isOpen: true },
    });
    expect(wrapper.find('form').exists()).toBe(true);
    expect(wrapper.text()).toContain('Register Household Asset');
    expect(wrapper.text()).toContain('Purchase Price (₦ NGN)');
  });
});
