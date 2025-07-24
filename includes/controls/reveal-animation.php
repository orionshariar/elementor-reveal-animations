<?php
if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

class Elementor_Reveal_Animation_Control extends \Elementor\Base_Control {

    public function get_type() {
        return 'reveal_animation';
    }

    public function enqueue() {
        // Enqueue control scripts/styles if needed
    }

    protected function get_default_settings() {
        return [
            'label' => __('Reveal Animation', 'elementor-reveal-animations'),
            'options' => [
                'fade' => __('Fade', 'elementor-reveal-animations'),
                'slide-up' => __('Slide Up', 'elementor-reveal-animations'),
                'slide-down' => __('Slide Down', 'elementor-reveal-animations'),
                'slide-left' => __('Slide Left', 'elementor-reveal-animations'),
                'slide-right' => __('Slide Right', 'elementor-reveal-animations'),
                'zoom-in' => __('Zoom In', 'elementor-reveal-animations'),
                'zoom-out' => __('Zoom Out', 'elementor-reveal-animations'),
            ],
            'separator' => 'before',
        ];
    }

    public function content_template() {
        ?>
        <div class="elementor-control-field">
            <label class="elementor-control-title">{{{ data.label }}}</label>
            <div class="elementor-control-input-wrapper">
                <select class="elementor-reveal-animation-select">
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