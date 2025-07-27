<?php
if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

class Elementor_Gsap_Animation_Control extends \Elementor\Base_Control {

    public function get_type() {
        return 'gsap_animation';
    }

    public function enqueue() {
        // Enqueue control scripts/styles if needed
    }

    protected function get_default_settings() {
        return [
            'label' => __('Gsap Animation', 'elementor-gsap-animations'),
            'options' => [
                'fade' => __('Fade', 'elementor-gsap-animations'),
                'slide-up' => __('Slide Up', 'elementor-gsap-animations'),
                'slide-down' => __('Slide Down', 'elementor-gsap-animations'),
                'slide-left' => __('Slide Left', 'elementor-gsap-animations'),
                'slide-right' => __('Slide Right', 'elementor-gsap-animations'),
                'zoom-in' => __('Zoom In', 'elementor-gsap-animations'),
                'zoom-out' => __('Zoom Out', 'elementor-gsap-animations'),
            ],
            'separator' => 'before',
        ];
    }

    public function content_template() {
        ?>
        <div class="elementor-control-field">
            <label class="elementor-control-title">{{{ data.label }}}</label>
            <div class="elementor-control-input-wrapper">
                <select class="elementor-gsap-animation-select">
                    <# _.each(data.options, function(option_title, option_value) { #>
                        <option value="{{ option_value }}">{{{ option_title }}}</option>
                    <# }); #>
                </select>
            </div>
        </div>
        <# if (data.description) { #>
            <div class="elementor-control-field-description">{{{ data.description }}}</div>
        <# } #>
        <?php
    }
}