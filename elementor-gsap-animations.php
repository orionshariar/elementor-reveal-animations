<?php
/**
 * Plugin Name: Elementor Gsap Animations
 * Description: Adds GAP-style Gsap Animations to Elementor containers
 * Version: 1.0.0
 * Author: Pixels71
 * Author URI: https://pixels71.com
 * Text Domain: elementor-gsap-animations
 * Requires Plugins: elementor
 * License: GPL-3.0+
 * License URI: http://www.gnu.org/licenses/gpl-3.0.txt
 */

defined('ABSPATH') || exit;

final class Elementor_Gsap_Animations {

    const VERSION = '1.0.0';
    const MINIMUM_ELEMENTOR_VERSION = '3.0.0';

    private static $_instance = null;

    public static function instance() {
        if (is_null(self::$_instance)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        add_action('plugins_loaded', [$this, 'init']);
    }

    public function init() {
        // Check if Elementor is installed and activated
        if (!did_action('elementor/loaded')) {
            add_action('admin_notices', [$this, 'admin_notice_missing_elementor']);
            return;
        }

        // Check for required Elementor version
        if (!version_compare(ELEMENTOR_VERSION, self::MINIMUM_ELEMENTOR_VERSION, '>=')) {
            add_action('admin_notices', [$this, 'admin_notice_minimum_elementor_version']);
            return;
        }

        // Add Plugin actions
        // add_action('elementor/frontend/after_register_scripts', [$this, 'register_frontend_scripts']);
        add_action('elementor/frontend/before_enqueue_scripts', [$this, 'register_frontend_scripts']);
        add_action('elementor/frontend/after_register_styles', [$this, 'register_frontend_styles']);
        add_action('elementor/controls/controls_registered', [$this, 'init_controls']);
        add_action('elementor/element/container/section_layout/after_section_end', [$this, 'add_gsap_animation_section'], 10, 2);
        add_action('elementor/frontend/container/before_render', [$this, 'before_container_render']);
        // widget section
        add_action('elementor/element/common/_section_style/after_section_end', [$this, 'add_gsap_animation_section'], 10, 2);
        add_action('elementor/frontend/widget/before_render', [$this, 'before_widget_render']);
    }

    public function admin_notice_missing_elementor() {
        if (isset($_GET['activate'])) unset($_GET['activate']);
        
        $message = sprintf(
            esc_html__('"%1$s" requires "%2$s" to be installed and activated.', 'elementor-gsap-animations'),
            '<strong>' . esc_html__('Elementor Gsap Animations', 'elementor-gsap-animations') . '</strong>',
            '<strong>' . esc_html__('Elementor', 'elementor-gsap-animations') . '</strong>'
        );

        printf('<div class="notice notice-warning is-dismissible"><p>%1$s</p></div>', $message);
    }

    public function admin_notice_minimum_elementor_version() {
        if (isset($_GET['activate'])) unset($_GET['activate']);

        $message = sprintf(
            esc_html__('"%1$s" requires "%2$s" version %3$s or greater.', 'elementor-gsap-animations'),
            '<strong>' . esc_html__('Elementor Gsap Animations', 'elementor-gsap-animations') . '</strong>',
            '<strong>' . esc_html__('Elementor', 'elementor-gsap-animations') . '</strong>',
            self::MINIMUM_ELEMENTOR_VERSION
        );

        printf('<div class="notice notice-warning is-dismissible"><p>%1$s</p></div>', $message);
    }

    public function register_frontend_scripts() {

        // wp_register_script(
        //     'elementor-gsap-animations-frontend',
        //     plugins_url('/assets/js/gsap-frontend.js', __FILE__),
        //     ['jquery', 'gsap', 'ScrollTrigger', 'elementor-frontend'],
        //     self::VERSION,
        //     true
        // );

        wp_enqueue_script( 'elementor-gsap-animations-frontend', plugins_url('/assets/js/gsap-frontend.js', __FILE__), array('jquery', 'gsap', 'ScrollTrigger', 'elementor-frontend'), self::VERSION, true );
    }

    public function register_frontend_styles() {
        wp_register_style(
            'elementor-gsap-animations-frontend',
            plugins_url('/assets/css/gsap-frontend.css', __FILE__),
            [],
            self::VERSION
        );
    }

    public function init_controls() {
        require_once(__DIR__ . '/includes/controls/gsap-animation.php');
        $controls_manager = \Elementor\Plugin::$instance->controls_manager;
        $controls_manager->register(new \Elementor_Gsap_Animation_Control());
    }

    public function add_gsap_animation_section($element, $args) {
        $element->start_controls_section(
            'gsap_animation_section',
            [
                'label' => __('Gsap Animation', 'elementor-gsap-animations'),
                'tab' => \Elementor\Controls_Manager::TAB_STYLE,
            ]
        );

        $element->add_control(
            'gsap_animation_enable',
            [
                'label' => __('Enable Gsap Animation', 'elementor-gsap-animations'),
                'type' => \Elementor\Controls_Manager::SWITCHER,
                'return_value' => 'yes',
                'default' => '',
                'frontend_available' => true,
            ]
        );

        $element->add_control(
            'gsap_animation_type',
            [
                'label' => __('Animation Type', 'elementor-gsap-animations'),
                'type' => \Elementor\Controls_Manager::SELECT,
                'default' => '',
                'options' => [
                    'gsap-reveal-me' => __('Reveal Me', 'elementor-gsap-animations'),
                    'gsap-reveal-text' => __('Reveal Text', 'elementor-gsap-animations'),
                    'gsap-text-appear' => __('Text Appear', 'elementor-gsap-animations'),
                ],
                'condition' => [
                    'gsap_animation_enable' => 'yes',
                ],
                'frontend_available' => true,
            ]
        );


        $element->add_control(
            'gsap_animation_duration',
            [
                'label' => __('Duration (s)', 'elementor-gsap-animations'),
                'type' => \Elementor\Controls_Manager::NUMBER,
                'default' => 0.9,
                'min' => 0.1,
                'max' => 5,
                'step' => 0.1,
                'condition' => [
                    'gsap_animation_enable' => 'yes',
                ],
                'frontend_available' => true,
            ]
        );

        $element->add_control(
            'gsap_animation_delay',
            [
                'label' => __('Delay (s)', 'elementor-gsap-animations'),
                'type' => \Elementor\Controls_Manager::NUMBER,
                'default' => 0,
                'min' => 0,
                'max' => 5,
                'step' => 0.1,
                'condition' => [
                    'gsap_animation_enable' => 'yes',
                ],
                'frontend_available' => true,
            ]
        );        

        $element->end_controls_section();
    }

    public function before_container_render($element) {
        $settings = $element->get_settings();
        // $widgetName = $element->get_name();
        // echo "<pre>"; print_r($widgetName); echo "</pre>";
        
        if ('yes' === $settings['gsap_animation_enable']) {
            // Add only the necessary classes
            $element->add_render_attribute('_wrapper', [
                'class' => 'gsap-animation '.$settings['gsap_animation_type'],
                'data-gsap-type' => $settings['gsap_animation_type'] ?? ''
            ]);
            
            // Enqueue scripts
            // wp_enqueue_script('gsap');
            // wp_enqueue_script('scroll-trigger');
            wp_enqueue_script('elementor-gsap-animations-frontend');
            wp_enqueue_style('elementor-gsap-animations-frontend');
        }
    }  

    public function before_widget_render($widget) {
        $this->before_container_render($widget);
    }
}

Elementor_Gsap_Animations::instance();